---
layout: post
title: How to test Elasticsearch in PHP applications
date: 2021-09-09T00:00:00.130Z
categories: php
---
Currently, I'm working on the [Elasticsearch PHP Sugar package][1]. It's a wrapper over the low-level Elasticsearch client that adds [syntactic sugar][2] for PHP developers. I'll publish a blog post once I publish the first release.

One of the interesting things I have to work on is testing Elasticsearch in PHP. When unit-testing an external service, you often need to simulate specific scenarios like returning a successful response, returning an error, or returning particular responses in a certain order. In this blog post, I will show you how to add unit tests and integration tests for Elasticsearch in your PHP application. Let's start with a short note about the Practical Test Pyramid.

### Practical Test Pyramid
![Test Pyramid](/assets/img/test-pyramid.png)

In his book [_Succeeding With Agile_][3]_,_ Mike Cohn came up with the Test Pyramid concept. Test Pyramid tells you to think about different layers of testing. It also tells you how much testing to do on each layer. It consists of three layers from the bottom up:

- Unit Tests.
- Service Tests.
- UI Tests.

The names introduced by Mike Cohn are confusing, at least for me. I'll go for different naming for each testing layer:

- Unit Tests. It's the same 😅
- Integration Tests.
- End to End Tests.

As a rule of thumb, stick to the pyramid shape to come up with a healthy, fast, and maintainable test suite. Below is a list of tips to follow:

1.  Write tests with different granularity
2.  The more high-level you get the fewer tests you should have
3.  Write _lots_ of small and fast _unit tests_.
4.  Write _some_ more coarse-grained tests.
5.  Write _very few_ high-level tests that test your application from end to end.

In this blog post, I will cover only the first two types of the Test Pyramid. Unit and Integration Tests.

### How to Unit Test Elasticsearch in PHP

Unit tests [shouldn't depend on a running cluster][4], should be mocked out instead. To be more specific the client response should be mocked.

```php
use GuzzleHttp\Ring\Client\MockHandler;
use Elasticsearch\ClientBuilder;

// The connection class requires 'body' to be a file stream handle
// Depending on what kind of request you do, you may need to set more values here
$handler = new MockHandler([
  'status' => 200,
  'transfer_stats' => [
     'total_time' => 100
  ],
  'body' => fopen('somefile.json'),
  'effective_url' => 'localhost'
]);
$builder = ClientBuilder::create();
$builder->setHosts(['somehost']);
$builder->setHandler($handler);
$client = $builder->build();
// Do a request and you'll get back the 'body' response above
```

The previous example is provided by the official package maintainers. Besides, I don't like the idea of using JSON files, we may need to override some values or options during the runtime. This is why I created [these Utils][5] to be used as follows:

```php
$handler = MockHandler::_mockTemplate_('index_document');
```

Just provide the template name to the [static method][13], and it will do the rest for you. [The template][6] is a PHP file that returns an array representing the expected client response.

**Here is an example of a unit test**

```php
class ElasticSearchEngineTest extends UnitTestCase
{
    /**
     * @test
     */
    public function test_it_can_index_a_document()
    {
        $handler = MockHandler::mockTemplate('index_document');

        $builder = ClientBuilder::create();
        $builder->setHandler($handler);
        $client = $builder->build();


        $elasticSearchEngine = new ElasticSearchEngine($client);
        $document = [
            'author' => 'Albert Einstein',
            'quote' => 'I have no special talents. I am only passionately curious.',
        ];

        $response = $elasticSearchEngine->index('quotes_index', $document);

        $expectedResponse = $this->getTemplate('index_document');
        $this->assertEquals($expectedResponse, $response);
    }
}
```

As simple as that 🚀

### How to add Integration Tests to Elasticsearch in PHP

For this part, you don't just need to run your application but also the component you're integrating with, Elasticsearch in our case. To automate this process I'm going to use [CircleCI][7]. CircleCI integrates with GitHub and Bitbucket, in our example project we will use Github, but you can do the same on Bitbucket.

Let's create our configuration file. Don't be worry if you didn't use CircleCI before, all you need is to understand the following YAML file.

on `.circleci/config.yml`

{% raw %}
```yaml
# PHP8.0 & ES7.14.0 CircleCI 2.0 configuration file
#
version: 2
jobs:
  build:
    docker:
      - image: circleci/php:8.0.10-cli #1
      - image: docker.elastic.co/elasticsearch/elasticsearch:7.14.0 #2
        environment: #3
          - transport.host: localhost
          - network.host: 127.0.0.1
          - http.port: 9200
          - cluster.name: es-cluster
          - discovery.type: single-node
          - xpack.security.enabled: false
          - ES_JAVA_OPTS: "-Xms256m -Xmx256m"
    steps: #4
      - checkout

      - run: sudo apt update

      # Download and cache dependencies
      - restore_cache:
          keys:
            # "composer.lock" can be used if it is committed to the repo
            - v1-dependencies-{{ checksum "composer.json" }}
            # fallback to using the latest cache if no exact match is found
            - v1-dependencies-

      - run: composer install -n --prefer-dist

      # Wait for ES startup
      - run: #5
          name: Waiting for Elasticsearch
          command: dockerize --wait http://localhost:9200 -timeout 1m
      # run tests with phpunit
      - run: composer test #6

```
{% endraw %}

I'm using docker images to build my application, `#1` for **PHP8.0** and `#2` for the **Elasticsearch** prebuild image. CircleCI provides other ways to start your machine, but docker 🐳 is super easy to use.

`#3` is the environment variables used for Elasticsearch configuration.

Number `#4` shows the build job steps, but give more attention to `#5` which allows our test suites to wait for Elasticsearch to be ready. Finally, on `#6` we are using composer to run PHPUnit Tests.

**Let's add the first integration test.** For your local development, you can depend on the docker-compose to start Elasticsearch.

```
docker-compose up -d
```

```php
class SearchEngineTest extends TestCase
{
    /**
     * @test
     */
    public function test_get_client_info()
    {
        $client = ClientBuilder::create()->build();
        $searchEngine = new ElasticSearchEngine($client);
        $info = $searchEngine->info();
        $this->assertArrayHasKey('tagline', $info);
        $this->assertEquals('You Know, for Search', $info['tagline']);
    }
}

```
**Final steps:**

![CircleCi Dashboard](/assets/img/circle-ci-es-php-app.png)

- Push your code to GitHub. 
- [Give CircleCI access][11] to this repository. 
- And watch your integration tests running. 🚀 🔥

### Summary

I have created a [repository of an example application][12]. You can clone it and start playing with code. It requires PHP.8 installed on your host machine. If you prefer PHP7, you can checkout to PHP7.3 branch.

It would be better if completed the exercises I added for you.

- Exercise No.1: [Add a unit test for search by a keyword.][8]
- Exercise No.2: [Add an integration test for indexing a document.][9]
- Exercise No.3: [Add an integration test for searching for a keyword.][10]

Feel free to make a PR of your answers.

[1]: https://github.com/imdhemy/elasticsearch-php-sugar
[2]: https://en.wikipedia.org/wiki/Syntactic_sugar
[3]: https://www.goodreads.com/book/show/6707987-succeeding-with-agile
[4]: https://github.com/elastic/elasticsearch-php/pull/618#issuecomment-323816444
[5]: https://github.com/imdhemy/testing-es-in-php/tree/master/tests/Utils
[6]: https://github.com/imdhemy/testing-es-in-php/blob/master/tests/fixtures/responses/index_document.php
[7]: https://circleci.com/
[8]: https://github.com/imdhemy/testing-es-in-php/blob/master/tests/Unit/ElasticSearchEngineTest.php#L39
[9]: https://github.com/imdhemy/testing-es-in-php/blob/master/tests/Integration/SearchEngineTest.php#L26
[10]: https://github.com/imdhemy/testing-es-in-php/blob/master/tests/Integration/SearchEngineTest.php#L35
[11]: https://app.circleci.com/
[12]: https://github.com/imdhemy/testing-es-in-php
[13]: https://github.com/imdhemy/testing-es-in-php/blob/master/tests/Utils/MockHandler.php#L45

source "https://rubygems.org"

# ------------------------------------------------------------------------------
# Ruby Version & config
# ------------------------------------------------------------------------------
#
# This is the version of Ruby you want to use.
#
ruby "4.0.0"

# ------------------------------------------------------------------------------
# Jekyll
# ------------------------------------------------------------------------------
#
# This is Jekyll version and the default theme.
#
gem "jekyll", "~> 4.4.1"
gem "minima", "~> 2.5"

# ------------------------------------------------------------------------------
# Plugins
# ------------------------------------------------------------------------------
#
# If you have any plugins, put them here!
#
group :jekyll_plugins do
#   gem "jekyll-feed", "~> 0.17"
end

# ------------------------------------------------------------------------------
# Fixes related to Windows, JRuby, and RubyGems
# ------------------------------------------------------------------------------
#
platforms :mingw, :x64_mingw, :mswin, :jruby do
  gem "tzinfo", ">= 1", "< 3"
  gem "tzinfo-data"
end
gem "wdm", "~> 0.1.1", :platforms => [:mingw, :x64_mingw, :mswin]
gem "http_parser.rb", "~> 0.6.0", :platforms => [:jruby]
gem "csv"
gem "base64"

# ------------------------------------------------------------------------------
# Custom Installed Gems
# ------------------------------------------------------------------------------
#
# If you have any custom installed gems, put them here!
#

gem "imdhemy-jekyll-theme", "1.7.0"

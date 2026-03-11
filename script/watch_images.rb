#!/usr/bin/env ruby
# frozen_string_literal: true

require "listen"
require "pathname"
require_relative "optimize_images"

module LocalImageWatcher
  module_function

  DEFAULT_IMAGE_DIR = "assets/img"
  SUPPORTED_IMAGE_PATTERN = /\.(?:png|jpe?g)\z/i

  def run(argv)
    directory = Pathname(argv.fetch(0, DEFAULT_IMAGE_DIR)).expand_path
    unless directory.directory?
      warn "Image directory not found: #{directory}"
      return 1
    end

    optimized_signatures = {}
    listener = Listen.to(directory.to_s, only: SUPPORTED_IMAGE_PATTERN) do |modified, added, _removed|
      each_changed_image(modified, added) do |path|
        optimize(path, optimized_signatures)
      end
    end

    puts "Watching #{directory} for image changes..."
    listener.start
    sleep
    0
  ensure
    listener&.stop
  end

  def each_changed_image(modified, added)
    (modified + added)
      .map { |path| Pathname(path).expand_path }
      .select(&:file?)
      .uniq
      .each { |path| yield path }
  end

  def optimize(path, optimized_signatures)
    signature = signature_for(path)
    return unless signature
    return if optimized_signatures[path.to_s] == signature

    puts "Optimizing changed image: #{path}"
    result = LocalThemeImageCLI.run([path.to_s])
    warn "Image optimization failed for #{path}" unless result.zero?
    optimized_signatures[path.to_s] = signature_for(path)
  end

  def signature_for(path)
    return unless path.exist?

    [path.size, path.mtime.to_f]
  end
end

exit(LocalImageWatcher.run(ARGV)) if $PROGRAM_NAME == __FILE__

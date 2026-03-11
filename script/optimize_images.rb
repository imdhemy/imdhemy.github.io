#!/usr/bin/env ruby
# frozen_string_literal: true

require "imdhemy/jekyll/theme/image_cli"

module LocalThemeImageCLI
  module_function

  def run(argv)
    Imdhemy::Jekyll::Theme::ImageCLI.run(argv)
  end
end

module Imdhemy
  module Jekyll
    module Theme
      class ImageCLI
        private

        def human_size(bytes)
          units = ["B", "KB", "MB", "GB"]
          value = bytes.to_f
          unit = units.shift
          while value >= 1024 && !units.empty?
            value /= 1024
            unit = units.shift
          end

          format(value >= 10 || unit == "B" ? "%.0f %s" : "%.1f %s", value, unit)
        end
      end
    end
  end
end

exit(LocalThemeImageCLI.run(ARGV)) if $PROGRAM_NAME == __FILE__

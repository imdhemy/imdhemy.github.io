#!/usr/bin/env ruby
# frozen_string_literal: true

module LocalDev
  module_function

  IMAGE_DIR = "assets/img"
  INITIAL_OPTIMIZE_COMMAND = ["bundle", "exec", "ruby", "script/optimize_images.rb", "--recursive", IMAGE_DIR].freeze
  SERVER_COMMAND = ["bundle", "exec", "jekyll", "serve", "--livereload", "--drafts", "--open"].freeze

  def run
    return 1 unless system(*INITIAL_OPTIMIZE_COMMAND)

    pids = [
      spawn("bundle", "exec", "ruby", "script/watch_images.rb", IMAGE_DIR),
      spawn(*SERVER_COMMAND)
    ]

    trap_signals { shutdown(pids) }
    _, status = Process.wait2(pids.last)
    shutdown(pids)
    wait_for(pids.first)
    status.exitstatus || 0
  end

  def shutdown(pids)
    pids.each do |pid|
      Process.kill("TERM", pid)
    rescue Errno::ESRCH
      nil
    end
  end

  def wait_for(pid)
    Process.wait(pid)
  rescue Errno::ECHILD
    nil
  end

  def trap_signals(&handler)
    Signal.trap("INT", &handler)
    Signal.trap("TERM", &handler)
  end
end

exit(LocalDev.run) if $PROGRAM_NAME == __FILE__

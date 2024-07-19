COLOR_INFO   := 33
COLOR_ERROR  := 31
COLOR_WARN   := 33
COLOR_SUCCESS:= 32

define toast
	@echo "\033[$(1)m$(2)\033[0m"
endef

start:
	$(call toast,$(COLOR_INFO),"Starting server...")
	jekyll serve --livereload --drafts --open

reinstall:
	$(call toast,$(COLOR_INFO),"Reinstalling dependencies...")
	bundle exec gem uninstall -aIx
	bundle install

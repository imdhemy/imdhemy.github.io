COLOR_INFO   := 33
COLOR_ERROR  := 31
COLOR_WARN   := 33
COLOR_SUCCESS:= 32

define toast
	@echo "\033[$(1)m$(2)\033[0m"
endef

IMAGE_DIR := assets/img

start:
	$(call toast,$(COLOR_INFO),"Starting server...")
	bundle exec ruby script/start_dev.rb

optimize-images:
	$(call toast,$(COLOR_INFO),"Optimizing images under $(IMAGE_DIR)...")
	bundle exec ruby script/optimize_images.rb --recursive $(IMAGE_DIR)

reinstall:
	$(call toast,$(COLOR_INFO),"Reinstalling dependencies...")
	bundle exec gem uninstall -aIx
	bundle install

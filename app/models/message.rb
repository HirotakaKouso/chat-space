class Message < ApplicationRecord
  validates :message_or_image, presence:true
  belongs_to :user
  belongs_to :group

private
  def message_or_image
    message.presence or image.presence
  end
end
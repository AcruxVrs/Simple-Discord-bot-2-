const mongoose = require('mongoose')

const reqString = {
  type: String,
  required: true,
}

const MuteSchema = mongoose.Schema(
  {
    userId: reqString,
    guildId: reqString,
    reason: reqString,
    staffId: reqString,
    staffTag: reqString,
    expires: {
      type: Date,
      required: true,
    },
    current: {
      type: Boolean,
      required: true,
    },
  },
  {
    timestamps: true,
  }
)

const MessageModel = module.exports = mongoose.model('mutes', MuteSchema)
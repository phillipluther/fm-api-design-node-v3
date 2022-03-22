import mongoose from 'mongoose'

const itemSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      maxlength: 50,
      trim: true
    },
    status: {
      type: String,
      required: true,
      default: 'active',
      enum: ['active', 'complete', 'pastdue']
    },
    notes: String,
    due: Date,
    createdBy: {
      type: mongoose.SchemaTypes.ObjectId,
      required: true,
      ref: 'user'
    },
    list: {
      type: mongoose.SchemaTypes.ObjectId,
      required: true,
      ref: 'list'
    }
  },
  { timestamps: true }
)

itemSchema.index({ item: 1, list: 1 }, { unique: true })
export const Item = mongoose.model('item', itemSchema)

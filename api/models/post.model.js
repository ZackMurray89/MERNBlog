import mongoose from 'mongoose'

const photoCategory = {
  uncategorized:
    'https://cdn.pixabay.com/photo/2016/05/08/14/58/icon-1379228_960_720.png',
  JavaScript:
    'https://cdn.pixabay.com/photo/2015/04/23/17/41/javascript-736400_1280.png',
}

const postSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
      unique: true,
    },
    image: {
      type: String,
    },
    category: {
      type: String,
      default: 'uncategorized',
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { timestamps: true }
)

postSchema.pre('save', function (next) {
  if (!this.image && photoCategory[this.category]) {
    this.image = photoCategory[this.category]
  }
  next()
})

const Post = mongoose.model('Post', postSchema)

export default Post

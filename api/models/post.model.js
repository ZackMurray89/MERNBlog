import mongoose from 'mongoose'

const photoCategory = {
  uncategorized:
    'https://cdn.pixabay.com/photo/2015/10/27/14/40/programming-1009134_1280.jpg',
  JavaScript:
    'https://res.cloudinary.com/dsc6sui8b/image/upload/v1721450115/JSforBlog_rccwzu.png',
  ReactJS:
    'https://res.cloudinary.com/dsc6sui8b/image/upload/v1721451559/ReactForBlogFinal_qkpsoj.png',
}

// https://cdn.pixabay.com/photo/2015/04/23/17/41/javascript-736400_1280.png

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

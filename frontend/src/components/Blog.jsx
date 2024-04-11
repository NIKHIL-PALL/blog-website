

import React from 'react'
import BlogCard from './BlogCard'
import logo from "../logo.svg";


function Blog() {
    const blogPost = {
        title: '10 Tips for Successful Blogging',
        author: 'Jane Smith',
        date: 'October 10, 2021',
        image: logo,
        content: 'Blogging can be a rewarding experience, but it also requires dedication and strategy. In this post, we share 10 tips for successful blogging to help you grow your audience and create engaging content.'
      };
  return (
    <section id='blog-section ' className='flex flex-wrap gap-7 justify-center items-center'>
        <BlogCard title={blogPost.title} author={blogPost.author} date={blogPost.date} image={blogPost.image} content={blogPost.content}/>
        <BlogCard title={blogPost.title} author={blogPost.author} date={blogPost.date} image={blogPost.image} content={blogPost.content}/>
        <BlogCard title={blogPost.title} author={blogPost.author} date={blogPost.date} image={blogPost.image} content={blogPost.content}/>
        <BlogCard title={blogPost.title} author={blogPost.author} date={blogPost.date} image={blogPost.image} content={blogPost.content}/>
        <BlogCard title={blogPost.title} author={blogPost.author} date={blogPost.date} image={blogPost.image} content={blogPost.content}/>
    </section>
  )
}

export default Blog
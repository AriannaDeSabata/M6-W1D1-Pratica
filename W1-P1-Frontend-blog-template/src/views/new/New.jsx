import React, { useCallback, useEffect, useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import "./styles.css";
import {convertToRaw} from "draft-js"
import draftToHtml from "draftjs-to-html"


const NewBlogPost = props => {

  const url = "http://localhost:3001/blogPosts"
  const keyFetch = localStorage.getItem("token")

  const [coverFile, setCoverFile] = useState(null)

  const [newPost, setNewPost] = useState({
    category: "",
    title: "",
    cover: "",
    content: ""
  })
  const [text, setText] = useState("");

  const handleChange = useCallback(value => {
    
    setText(draftToHtml(value));
 
  });

  const handleFile =(e)=>{
    setCoverFile(e.target.files[0])
    console.log(e.target.files[0])
  }

  const handleChangeForm = (e)=>{
    setNewPost({
      ...newPost,
      [e.target.name]: e.target.value,
      content: text
    })

  }

    const postBlogPost= async()=>{
      try {
        const res = await fetch(url,{
          method:'POST',
          body: JSON.stringify(newPost),
          headers:{
            "Content-Type" : 'application/json',
            Authorization: keyFetch
          }
        })


      if(res.ok){
        const postCreated = await res.json()

        if(coverFile){
          const uploadFile = async()=>{
            try {
              const data = new FormData()
              data.append('cover', coverFile)
              console.log(data)
        
              const res = await fetch(url + '/' + postCreated._id + '/cover',{
                method: 'PATCH',
                body: data,          
                headers:{
                  Authorization: keyFetch
                }
              })
              if(res.ok){
                const response = await res.json()
                console.log(response)
                setCoverFile(null)
              }
            } catch (error) {
              console.log(error)
            }
          }
         uploadFile()
        }


        setNewPost({
          category: "",
          title: "",
          cover: "",
          content: ""
        })
      }



    } catch (error) {
      console.log(error)
    }
    }




  const handleSubmit = (e)=>{
    e.preventDefault()
    postBlogPost()

  }

  return (
    <Container className="new-blog-container">
      <Form className="mt-5">
        <Form.Group controlId="blog-form" className="mt-3">
          <Form.Label>Titolo</Form.Label>
          <Form.Control size="lg" placeholder="Title" name="title" onChange={handleChangeForm}/>
        </Form.Group>

        <Form.Group controlId="blog-form" className="mt-3">
          <Form.Label>Cover</Form.Label>
          <Form.Control size="lg" placeholder="Title" type="file" accept="image/" name="file" onChange={handleFile}/>
        </Form.Group>

        <Form.Group controlId="blog-category" className="mt-3" onChange={handleChangeForm}>
          <Form.Label>Categoria</Form.Label>
          <Form.Control size="lg" as="select" name="category">
            <option>Categoria 1</option>
            <option>Categoria 2</option>
            <option>Categoria 3</option>
            <option>Categoria 4</option>
            <option>Categoria 5</option>
          </Form.Control>
        </Form.Group>

        <Form.Group controlId="blog-content" className="mt-3">
          <Form.Label>Contenuto Blog</Form.Label>

          <Editor value={text} onChange={handleChange} className="new-blog-content" />
        </Form.Group>

        <Form.Group className="d-flex mt-3 justify-content-end">
          <Button type="reset" size="lg" variant="outline-dark">
            Reset
          </Button>
          <Button
            type="submit"
            size="lg"
            variant="dark"
            style={{
              marginLeft: "1em",
            }}
            onClick={handleSubmit}
          >
            Invia
          </Button>
        </Form.Group>

      </Form>
    </Container>
  );
};

export default NewBlogPost;

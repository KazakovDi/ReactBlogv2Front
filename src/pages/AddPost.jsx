import React from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import SimpleMDE from 'react-simplemde-editor';
import "easymde/dist/easymde.min.css";
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import axios from "../axios"
import styles from "./AddPost.module.scss"

import { useDispatch, useSelector } from 'react-redux';
import { fetchSinglePost } from '../Redux/slices/postSlice';
const AddPost = () => {
    const navigate = useNavigate()
    const {id} = useParams()
    const isEditing = Boolean(id)
    const imageRef = React.useRef(null)
    const titleRef = React.useRef("")
    const tagsRef = React.useRef("")
    const isLoaded = useSelector(state=> {
      if(!state.post.data || state.post.data.length > 1)
        return false
      return true
    })
    const image = useSelector(state=> {
      if(isLoaded)
        return state.post.data[0].imageUrl
    })
    const [imageUrl, setImageUrl] = React.useState("")
    React.useEffect(()=> {
      if(image) {
        setImageUrl(image)
        console.log("[eq")
      }
    }, [image])
    console.log("imageUrl", imageUrl)
    let tags = ""
    const [text, setText] = React.useState(useSelector(state=> {
        if(isLoaded) {
          tags = state.post.data[0].tags.map(tag=> tag.body).join(",")
          return state.post.data[0].text
        }  
    }))
    console.log(text)
    const title = useSelector(state=> {
      if(isLoaded)
        return state.post.data[0].title
    })

    const dispatch = useDispatch()
    React.useEffect(()=> {
      if(isEditing)
        dispatch(fetchSinglePost(id))
    }, [])
      const options = React.useMemo(
        () => ({
          spellChecker: false,
          maxHeight: '400px',
          autofocus: true,
          placeholder: 'Введите текст...',
          autosave: {
            enabled: true,
            delay: 1000,
          },
        }),
        [],
      );
      const onChange = React.useCallback((value) => {
        setText(value);
      }, []);
      const removeImg = ()=> {
        setImageUrl("")
        imageRef.current.value = ""
      }
      const onSubmitHandler = async () => {
        console.log(text, "text")
        const fields = {
            title: titleRef.current.value,
            tags: tagsRef.current.value.trim().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, ' ').replace(/\s{2,}/g," ").split(' '),
            text,
            imageUrl
        }
        try {
          const {data} = isEditing
          ? await axios.patch(`/posts/${id}/edit`, fields)
          : await axios.post("/createPost", fields)
        const _id = isEditing ? id : data._id
        navigate(`/posts/${_id}`)
        } catch(err) {
            alert(err.response.data.message)
        }   
      }
      const uploadImage = async event=> {
        try {
            const formData = new FormData()
            const file = event.target.files[0]
            console.log(file)
            formData.append("image", file)
            const {data} = await axios.post("/uploadImage", formData)
            setImageUrl(data.url)
          } catch(err) {
            console.warn(err)
            alert("Не удалось загрузить файл")
          }
      }
  return (
    <div className="container">
        <Paper style={{ padding: 30 }}>
            <Button className={styles.addBtn} onClick={()=> {imageRef.current.click()}} variant="outlined" size="large">
                Загрузить фото
            </Button>
            {imageUrl && (
                <>
                    <Button className={styles.removeBtn} onClick={removeImg} variant="contained" color="error">
                        Убрать фото
                    </Button>
                    <div className={styles.preview}>
                      <img  src={`https://blogged.onrender.com${imageUrl}`} />
                    </div>
                    <div></div>
                </>
            )}
            <div>
              <input className={styles.titleField} placeholder="Название" ref={titleRef} defaultValue={title} />
            </div>
            <div>
              <input className={styles.tagsField} placeholder="Теги" ref={tagsRef} defaultValue={tags}/>
            </div>
            <input onChange={event=> {uploadImage(event)}} ref={imageRef} type="file" hidden/>
            <SimpleMDE onChange={onChange} options={options} defaultValue={text}  />
            <input onClick={onSubmitHandler} type="submit"  value={!isEditing ? "Создать" : "Обновить"}/>
        </Paper>  
    </div>
           
  )
}

export default AddPost
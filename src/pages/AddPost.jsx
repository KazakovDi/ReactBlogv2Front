import React from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import SimpleMDE from 'react-simplemde-editor';
import "easymde/dist/easymde.min.css";
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import axios from "../axios"
import styles from "./AddPost.module.scss"
const AddPost = () => {
    const navigate = useNavigate()
    const {id} = useParams()
    const isEditing = Boolean(id)
    const inputRef = React.useRef(null)
    const [title, setTitle] = React.useState("")
    const [text, setText] = React.useState("")
    const [tags, setTags] = React.useState("")
    const [imageUrl, setImageUrl] = React.useState("")
    React.useEffect(()=> {
      if(isEditing) {
        axios.get(`/posts/${id}`)
        .then(({data}) => {
          setTitle(data.title)
          const newTags = data.tags.map(tag=> {
            return tag.body
          })
          setTags(newTags.join(","))
          setImageUrl(data.imageUrl)
          setText(data.text)
        }).catch(err=> {
          console.warn(err)
          alert("Не удалось получить статью")
        })
      }
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
        setText(value)
      }, []);
      const removeImg = ()=> {
        setImageUrl("")
        inputRef.current.value = ""
      }
      const onSubmitHandler = async () => {
        const fields = {
            title,
            tags: tags.trim().replace(/[ ]+/g, ' ').split(' '),
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
            <Button onClick={()=> {inputRef.current.click()}} variant="outlined" size="large">
                Загрузить фото
            </Button>
            {imageUrl && (
                <>
                    <Button className={styles.removeBtn} onClick={removeImg} variant="contained" color="error">
                        Убрать фото
                    </Button>
                    <div className={styles.preview}>
                      <img  src={`http://localhost:5000${imageUrl}`} />
                    </div>
                    <div></div>
                </>
            )}
            <div>
              <input className={styles.titleField} placeholder="Название" onChange={e=> setTitle(e.target.value)} value={title} />
            </div>
            <div>
              <input className={styles.tagsField} placeholder="Теги" onChange={e=> setTags(e.target.value)} value={tags}/>
            </div>
            <input onChange={event=> {uploadImage(event)}} ref={inputRef} type="file" hidden/>
            <SimpleMDE options={options} onChange={onChange} value={text}  />
            <input onClick={onSubmitHandler} type="submit" value={!isEditing ? "Создать" : "Обновить"}/>
        </Paper>  
    </div>
           
  )
}

export default AddPost
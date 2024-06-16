import React, { useEffect, useState } from 'react'

const Home = () => {
    const[images,setImages] = useState([]);
    const[page,setPage] = useState(1);
    const result = async ()=>{
        const res = await fetch(`https://api.unsplash.com/photos?page=${page}`,{
            headers:{
                'Authorization': 'Client-ID mNPWMvtD9jKtf-WUbVkag3T6SjxNiPEe4l-1pb5MLrY'
            }
        })
        .then((res)=> res.json())
        .then((data) =>{
            if(page === 1){
                setImages(data)
            }
            else{
                setImages((prev)=> [...prev,...data])
            }
        })
        .catch((error)=> console.log("Error : ",error))
        
    }
    console.log(images);    
    
    useEffect(()=>{
        result();

    },[page])

    function handleScroll(){
        // console.log("Height" , document.documentElement.scrollHeight);
        // console.log("Top height" ,document.documentElement.scrollTop);
        // console.log("Window height" , window.innerHeight)
        
        if(window.innerHeight + document.documentElement.scrollTop + 1 >= document.documentElement.scrollHeight){
            setPage(prev=> prev+1)
        }
    }

    useEffect(()=>{
        window.addEventListener("scroll",handleScroll);
        return ()=> window.removeEventListener("scroll",handleScroll)
    },[])
  return (
    <div>
        <div className='header'>
        <h1>Geek Gallery</h1>
        
        </div>
        

    <div className='gid'>
        
        {
            images.map((item,index)=>{
                return(
                    <div className='images_container' key={index}>
                        <img className='imagess' src={item.urls.regular} />
                        <p className='textss'>{item.alt_description}</p>
                        <p className='updated'>{item.user.updated_at}</p>
                    </div>
                )
            })
        }
        
    </div>
    <div className='footer'>
        <h2 >Developed By Suyash Kakade!</h2>
    </div>
    </div>
  )
}

export default Home
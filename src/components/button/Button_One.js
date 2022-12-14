import React from 'react'

const Button_One = ({name,type,css,onClick,loading}) => {
    return (
        <button onClick={onClick} type={type} className={`rounded-lg ${css} max-w-[12rem]  px-3 py-1.5 m-1   shadow-lg bg-[#44C97D] hover:bg-[#31945c] transition-colors text-white`}>
        
        {loading ?
                    <div className="cssload-jumping">
                        <span></span><span></span><span></span><span></span><span></span>
                    </div>
                    :

                    name
                }
        </button>
    )
}

export default Button_One
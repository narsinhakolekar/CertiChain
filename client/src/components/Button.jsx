function Button({
    children,
    type="button",
    color="blue",
    onClick
}){


const colors={

blue:
"bg-blue-600 hover:bg-blue-700",

green:
"bg-green-600 hover:bg-green-700",

red:
"bg-red-600 hover:bg-red-700",

purple:
"bg-purple-600 hover:bg-purple-700"

};


return (

<button

type={type}

onClick={onClick}

className={`
${colors[color]}
text-white
px-6
py-3
rounded-xl
font-semibold
shadow-lg
transition
hover:scale-105
`}

>

{children}

</button>

);


}


export default Button;
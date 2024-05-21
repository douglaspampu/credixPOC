const Product = (props) => {
    console.log(props)
    return <div>
        <h3 style={{display:"flex", justifyContent:"center"}}>{props.props.name}</h3>
        <img style={{marginLeft:"auto",marginRight:"auto", display:"block"}} height="200px" width="200px" src={props.props.image_url} />
        <p>{props.props.price}</p>
    </div>
}

export default Product
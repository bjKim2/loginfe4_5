import React,{useState} from "react";
import {useNavigate} from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import api from "../utils/api";

const RegisterPage = () => {
  const [name,setName] = useState('');
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const [secPassword,secSecPassword] = useState('');
  const [error,setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) =>{
    event.preventDefault()
    try{
      if (password !== secPassword) {
        // 패스워드가 일치 하지 않는다.
        throw new Error("패스워드가 일치하지 않습니다.")
      }
      if(password === '' || secPassword === '' || email === '' || name === ''){
        throw new Error("모든 항목을 입력해주세요")
      }
      const response = await api.post('/user' ,{name, email, password});
      if(response.status=== 200){
        navigate('/login');
      }else{
        throw new Error(response.data.error                                           )
      }
      console.log("rrrr : ",response)
    }catch(error){
      setError(error.message)
      //err
    }
  }
  return (
    <div className="display-center">
      {error && <div className='red-error'>{error}</div>}
      <Form className="login-box" onSubmit ={handleSubmit}>
        <h1>회원가입</h1>
        <Form.Group className="mb-3" controlId="formName">
          <Form.Label>Name</Form.Label>
          <Form.Control type="string" placeholder="Name" onChange={(event) => setName(event.target.value)}/>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" onChange={(event) => setEmail(event.target.value)} />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" onChange={(event) => setPassword(event.target.value)} />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>re-enter the password</Form.Label>
          <Form.Control type="password" placeholder="re-enter the password" onChange={(event) => secSecPassword(event.target.value)}/>
        </Form.Group>

        <Button className="button-primary" type="submit">
          회원가입
        </Button>
      </Form>
    </div>
  );
};

export default RegisterPage;

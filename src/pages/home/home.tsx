import axios from 'axios';
import { useEffect, useState } from 'react'
import { Link } from 'react-router';
export interface ITodo {
    id: string;
    name: string;
    email: string;
    job: string;
    img?: string;
    age: number | string;
    phone: string | number;
    status: boolean;
}

export const url = 'http://localhost:3002/users'
const Home = () => {
    const [data, setData] = useState<ITodo[]>([])
    async function get() {
        try {
            const { data } = await axios.get(url)
            setData(data)
        } catch (error) {
            console.error(error);
        }
    }
    useEffect(() => {
        get()
    }, [])

    const [open, setOpen] = useState<boolean>(false)
    const [name, setName] = useState<string>('')
    const [email, setEmail] = useState<string>('')
    const [age, setAge] = useState<number | string>('')
    const [job, setJob] = useState<string>('')
    const [phone, setPhone] = useState<number | string>('')
    const [st, setSt] = useState<boolean>(false)
    const [edit, setEdit] = useState<boolean>(false)
    const [idx, setIdx] = useState<ITodo | {}>({})

    async function add() {
        const users: ITodo = { id: Date.now().toString(), name, email, age, job, phone, status: false }
        try {
            await axios.post(url, users)
            get()
        } catch (error) {
            console.error(error);
        }
        setOpen(false)
        setEdit(false)
        setName(''), setEmail(''), setAge(''), setJob(''), setPhone('')
    }
    async function Del(id: string) {
        try {
            await axios.delete(`${url}/${id}`)
            get()
        } catch (error) {
            console.error(error);
        }
    }
    async function Check(el: ITodo) {
        try {
            await axios.put(`${url}/${el.id}`, { ...el, status: !el.status })
            get()
        } catch (error) {
            console.error(error);
        }
    }
    function full(el: ITodo) {
        setName(el.name)
        setEmail(el.email)
        setAge(el.age)
        setJob(el.job)
        setPhone(el.phone)
        setSt(el.status)
        setIdx(el.id)
        setOpen(false)
        setEdit(true)
    }
    async function editer() {
        try {
            await axios.put(`${url}/${idx}`, { id: idx, name, email, age, job, phone, status: st })
            get()
        } catch (error) {
            console.error(error);
        }
        setOpen(false)
        setEdit(false)
        setName(''), setEmail(''), setAge(''), setJob(''), setPhone('')
    }


    return (
        <div className='w-[70%] m-[100px_auto]'>
            <div className="top flex justify-between items-center">
                <h1 className='font-semibold text-[35px]'>TableUsers</h1>
                <button onClick={() => { setOpen(true), setEdit(false) }} className='bg-[#297efe] text-white p-[7px_15px] rounded-[5px]'>+ Add</button>
            </div><br />
            <div className='flex gap-[30px] flex-wrap'>
                {
                    data.map((el: ITodo) => <div className={`w-[30%] h-[490px] ${el.status ? 'border-[green]' : 'border-[red]'} border-2 p-[20px] rounded-[20px]`} key={el.id}>
                        <img src={el.img} className='h-[200px] w-[200px] m-auto rounded-[50%]' alt="" />
                        <h1 className='font-medium text-center text-[26px]'>{el.name}</h1>
                        <div className='flex my-[5px] justify-between font-medium items-center'>
                            <p>Profession:</p>
                            <p>{el.job}</p>
                        </div>
                        <div className='flex my-[5px] justify-between font-medium items-center'>
                            <p>Phone:</p>
                            <p>{el.phone}</p>
                        </div>
                        <div className='flex my-[5px] justify-between font-medium items-center'>
                            <p>Status:</p>
                            <p className={`p-[5px_20px] ${el.status ? 'bg-[lightgreen] text-[green]' : 'bg-[lightcoral] text-white'} rounded-[15px]`}>{el.status ? 'Active' : 'Inactive'}</p>
                        </div><br />
                        <div className='flex justify-between'>
                            <button onClick={() => Del(el.id)} className='p-[5px_25px] hover:cursor-pointer rounded-[10px] bg-[red] text-white'>Delete</button>
                            <button onClick={() => { full(el) }} className='p-[5px_30px] rounded-[10px] bg-[green] text-white'>Edit</button>
                            <button onClick={() => Check(el)} className='p-[4px_15px] rounded-[10px] border-[green] text-[green] font-medium border-2'>Check</button>
                        </div>
                        <button className='bg-[blue] text-white w-[100%] py-[10px] my-[10px] rounded-[10px]'><Link to={`/users/${el.id}`}>See Profile</Link></button>
                    </div>)
                }
            </div>
            {(open || edit) && <div className='bg-white fixed top-[100px] left-[600px] p-[30px] border-2 w-[25%] border-[blue] rounded-[10px]'>
                <input value={name} onChange={(e) => setName(e.target.value)} className='border-2 border-[blue] w-[100%] rounded-[5px] my-[10px] p-[10px]' type="text" placeholder='Name' /><br />
                <input value={email} onChange={(e) => setEmail(e.target.value)} className='border-2 border-[blue] w-[100%] rounded-[5px] my-[10px] p-[10px]' type="email" placeholder='Email' /><br />
                <select defaultValue={job} onChange={(e) => setJob(e.target.value)} className='border-2 border-[blue] w-[100%] rounded-[5px] font-medium text-[18px] my-[10px] p-[10px]' name="" id="">
                    <option value="Front End Developer">Front End Developer</option>
                    <option value="Back End Developer">Back End Developer</option>
                    <option value="Full Stack Developer">Full Stack Developer</option>
                </select><br />
                <input value={phone} onChange={(e) => setPhone(e.target.value)} className='border-2 border-[blue] w-[100%] rounded-[5px] my-[10px] p-[10px]' type="number" placeholder='Phone' /><br />
                <input value={age} onChange={(e) => setAge(e.target.value)} className='border-2 border-[blue] w-[100%] rounded-[5px] my-[10px] p-[10px]' type="number" placeholder='Age' /><br />
                <div className='flex gap-[10px] justify-end mt-[10px]'>
                    <button onClick={() => setOpen(false)} className='p-[10px_25px] hover:cursor-pointer rounded-[10px] bg-[red] text-white'>Cancel</button>
                    <button onClick={() => { edit ? editer() : add() }} className='p-[10px_25px] hover:cursor-pointer rounded-[10px] bg-[blue] text-white'>Save</button>
                </div>
            </div>}
        </div>
    )
}

export default Home
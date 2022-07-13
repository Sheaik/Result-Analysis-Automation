import React from 'react'
import '../../css/student/StudentAddDepartment.css'
import FormData from "form-data";
import Axios from "axios";
import Loader from '../../assets/Loader.gif'

class StudentAddDepartment extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            file: null,
            type: 'department',
            batch: '',
            department: '',
            loader: ''
        }
        this.onFileChange = this.onFileChange.bind(this)
        this.onDeptChange = this.onDeptChange.bind(this)
        this.onBatchChange = this.onBatchChange.bind(this)
        this.handleAddStudents = this.handleAddStudents.bind(this)
    }

    onFileChange(event){
        document.getElementById('file-chosen').textContent = event.target.files[0].name
        this.setState({
            file: event.target.files[0]
        })
    }

    onDeptChange(){
        this.setState({
            department: document.getElementById("dept").value
        })
    }

    onBatchChange(){
        this.setState({
            batch: document.getElementById("batch").value
        })
    }

    async handleAddStudents(){
        // console.log(this.state.batch, this.state.department, this.state.type, this.state.file.name)
        if(this.state.batch === '' || this.state.batch == null){
            alert("Batch is Empty")
        }
        else if(this.state.department === '' || this.state.department == null){
            alert("Department is Empty")
        }
        else if(this.state.file == null){
            alert("File is Empty")
        }else if(this.state.type === '' || this.state.type == null){
            alert("Type is Empty")
        }
        else{
            const extension = this.state.file.name.split('.')[1]
            if(extension !== 'csv'){
                alert('Only CSV file is allowed to upload')
            }else{
                this.setState({
                    loader: 'loading'
                })
                const formData = new FormData();
                formData.append('file', this.state.file)
                formData.append('type', this.state.type)
                formData.append('dept', this.state.department)
                formData.append('batch', this.state.batch)
                await Axios.post('http://localhost:5000/students/', formData, {
                    headers: {
                        'content-type': 'multipart/form-data'
                    }
                }).then(res => {
                    console.log(res.data)
                    this.setState({
                        loader: ''
                    })
                }).catch(err => {
                    console.log(err)
                    this.setState({
                        loader: ''
                    })
                })
            }
        }
    }

    render() {
        return (
            <div className={'StudentAddDepartment'}>
                <div className={'title'}>
                    Add Students of a Department
                </div>
                <div className={'input-container'}>
                    <div className={'loader ' + this.state.loader}>
                        <div className={'loader-animation'}>
                            <img src={Loader} alt={'Loading...'} />
                        </div>
                        <div className={'loader-text'}>Uploading...</div>
                    </div>
                    <div className={'form-container ' + this.state.loader}>
                        <div className={'batch'}>
                            <input type={ 'text' } placeholder={ 'Enter the Batch(Ex: 2018-2022)' } id={ 'batch' }
                                   value={ this.state.batch } onChange={ this.onBatchChange }/>
                        </div>
                        <div className={'dept'}>
                            <select id={'dept'} onChange={this.onDeptChange}>
                                <option value={ '' }>Select
                                    Department
                                </option>
                                <option value={ 'cse' }>
                                    Computer Science Engineering
                                </option>
                                <option value={ 'it' }>
                                    Information Technology
                                </option>
                                <option value={ 'auto' }>
                                    Automobile Engineering
                                </option>
                                <option value={ 'mech' }>
                                    Mechanical Engineering
                                </option>
                                <option value={ 'eee' }>
                                    Electrical And Electronics Engineering
                                </option>
                                <option value={ 'ece' }>
                                    Electronics and Communication Engineering
                                </option>
                                <option value={ 'eie' }>
                                    Electronics and Instrumentation Engineering
                                </option>
                                <option value={ 'civil' }>
                                    Civil Engineering Engineering
                                </option>
                            </select>
                        </div>
                        <div className={'file-upload'}>
                            <div className={'file-upload-container'}>
                                <input type={ 'file' } id={ 'file' } hidden onChange={ this.onFileChange }/>
                                <label htmlFor={ 'file' }>Choose File</label>
                                <span id={ 'file-chosen' }>No File Chosen</span>
                            </div>
                        </div>
                        <div className={'button-container'}>
                            <button className={'add-marks'} onClick={this.handleAddStudents}>Add Students</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default StudentAddDepartment
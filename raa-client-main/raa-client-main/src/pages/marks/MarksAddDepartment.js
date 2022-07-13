import React from 'react'
import '../../css/marks/MarksAddDepartment.css'
import FormData from "form-data";
import Axios from 'axios'
import Loader from "../../assets/Loader.gif";

class MarksAddDepartment extends React.Component{

    constructor(props) {
        super(props);
        this.state= {
            type: '',
            file: null,
            loader: ''
        }
        this.onFileChange = this.onFileChange.bind(this)
        this.onTypeChange = this.onTypeChange.bind(this)
        this.handleAddMarks = this.handleAddMarks.bind(this)
    }

    onTypeChange(){
        this.setState({
            type: document.getElementById("type").value
        })
    }

    onFileChange(event){
        document.getElementById('file-chosen').textContent = event.target.files[0].name
        this.setState({
            file: event.target.files[0]
        })
    }

    async handleAddMarks(){
        if(this.state.file == null){
            alert("File is Empty")
        }else if(this.state.type === '' || this.state.type == null){
            alert("Type is Empty")
        }
        else{
            const extension = this.state.file.name.split('.')[1]
            if(extension !== 'pdf'){
                alert('Only PDF file is allowed to upload')
            }else{
                this.setState({
                    loader: 'loading'
                })
                const formData = new FormData();
                formData.append('file', this.state.file)
                formData.append('type', this.state.type)
                await Axios.post('http://localhost:5000/marks', formData, {
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

    render () {
        return (
            <div className={'MarksAddDepartment'}>
                <div className={'title'}>
                    Add Marks of a Department
                </div>
                <div className={'input-container'}>
                    <div className={'loader ' + this.state.loader}>
                        <div className={'loader-animation'}>
                            <img src={Loader} alt={'Loading...'} />
                        </div>
                        <div className={'loader-text'}>Uploading...</div>
                    </div>
                    <div className={'form-container ' + this.state.loader}>
                        <div className={'type'}>
                            <select id={'type'} onChange={this.onTypeChange}>
                                <option value={''}>Select Type</option>
                                <option value={'before_revaluation'}>Before Revaluation</option>
                                {/*<option value={'after_revaluation'}>After Revaluation</option>*/}
                                {/*<option value={'after_review'}>After Review</option>*/}
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
                            <button className={'add-marks'} onClick={this.handleAddMarks}>Add Marks</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default MarksAddDepartment
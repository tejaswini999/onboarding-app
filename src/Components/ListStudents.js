import React, { Component } from 'react';
import Modal from "react-modal";

Modal.setAppElement('#root')
class ListStudents extends Component {

    constructor() {
        super();
        this.state = {
            students: [],
            dialogOpen: false,
            searchStudent: '',
            categoryName: '',
            deleteItem: ''
        }
    }

    componentDidMount() {
        this.getStudents();
    }

    getStudents = () => {
        fetch('http://localhost:4000/students')
            .then(res => res.json())
            .then(data => {
                this.setState({
                    students: data
                })
            });
    }

    getStudentsByType = (category) => {
        fetch('http://localhost:4000/students')
            .then(res => res.json())
            .then(data => {
                this.setState({
                    students: data.filter(student => student.category === category)
                })
            });
    }

    navigateToOnboard = () => {
        this.props.history.push('/addStudent')
    }

    navigateToStudents = () => {
        this.props.history.push('/students')
    }

    viewDetails = (student) => {
        this.props.history.push(`/studentDetails/${student.id}`)
    }

    editOnboard = (student) => {
        this.props.history.push(`/editOnboard/${student.id}`)
    }

    setDeleteItem(item) {
        this.setState({
            deleteItem: item.id
        })
    }

    deleteStudent = () => {
        const id = this.state.deleteItem;
        fetch('http://localhost:4000/students/' + id, {
            method: 'DELETE'
        })
            .then(res => res.json())
            .then(data => {
                if (this.state.categoryName === 'International' || this.state.categoryName === 'Domestic') {
                    this.getStudentsByType(this.state.categoryName)
                }
                else {
                    this.getStudents()
                }
            })
    }

    listType = (e) => {
        const val = e.target.value
        this.setState({
            categoryName: val,
            searchStudent: ''
        })

        if (val === 'International' || val === 'Domestic') {
            this.getStudentsByType(val)
        }
        else {
            this.getStudents()
        }
    }

    getAllStudentsSearched = () => {
        fetch('http://localhost:4000/students')
            .then(res => res.json())
            .then(data => {
                this.setState({
                    students: data.filter(student => student.studentName.toLowerCase().includes(this.state.searchStudent))
                })
            });
    }

    getStudentsSearched = (category) => {
        fetch('http://localhost:4000/students')
            .then(res => res.json())
            .then(data => {
                this.setState({
                    students: data.filter(student => student.studentName.toLowerCase().includes(this.state.searchStudent) && student.category === category)
                })
            });
    }

    searchStudent = (e) => {
        const val = e.target.value

        this.setState({
            searchStudent: val
        })

        if (this.state.categoryName === 'Domestic' || this.state.categoryName === 'International') {
            this.getStudentsSearched(this.state.categoryName)
        }
        else {
            this.getAllStudentsSearched();
        }

    }

    open = () => this.setState({ dialogOpen: true })
    close = () => this.setState({ dialogOpen: false })

    render() {
        return (
            <div>
                <div className="header">
                    <button className="header-buttons" onClick={() => this.navigateToOnboard()}>Onboarding Form</button>
                    <button style={{ backgroundColor: "darkblue", color: "white" }} className="header-buttons" onClick={() => this.navigateToStudents()}>List Students</button>
                </div>

                <div className="home">

                    <table>
                        <tbody>
                            <tr>
                                <td className="left1">
                                    <select style={{height: '30px', textAlign: 'center'}} className="input" name="categoryName" value={this.state.categoryName} onChange={(e) => this.listType(e)}>
                                        <option value="All">All</option>
                                        <option value="Domestic">Domestic</option>
                                        <option value="International">International</option>
                                    </select>
                                </td>
                                <td className="right1">
                                    <input style={{height: '25px', textAlign: 'left'}} className="input" name="searchStudent" type="text" value={this.state.searchStudent} placeholder="Search Student" onChange={(e) => this.searchStudent(e)}></input>
                                </td>
                            </tr>
                        </tbody>
                    </table>

                    <ul>
                        {
                            this.state.students.map(item => (
                                <li key={item.id}>

                                    <div style={{ backgroundColor: item.category === "Domestic" ? "#FFE5B4" : "lavender" }} className="row">
                                        <div style={{ width: "100%", fontSize: '20px' }}>{item.studentName}</div>

                                        <div style={{ width: "100%", paddingBottom: "10px", fontSize: '20px' }}>details...</div>

                                        <div style={{ display: "flex", flexDirection: "row", width: "100%", justifyContent: "flex-end", paddingTop: "10px" }}>
                                            <div className="col">
                                                <button style={{ backgroundColor: "limegreen" }} className="button" onClick={() => this.editOnboard(item)}>Edit</button>
                                            </div>

                                            <div className="col">
                                                <button style={{ backgroundColor: "darkgray" }} className="button" onClick={() => this.viewDetails(item)} >View</button>
                                            </div>

                                            <div className="col">
                                                <button style={{ backgroundColor: "red" }} className="button" onClick={() => {this.open(); this.setDeleteItem(item)}}>Delete</button>
                                            </div>
                                        </div>

                                    </div>

                                    <Modal
                                            isOpen={this.state.dialogOpen}
                                            onRequestClose={this.close}
                                            style={{
                                                overlay: {
                                                    position: 'fixed',
                                                    top: '200px',
                                                    left: '450px',
                                                    right: '450px',
                                                    bottom: '200px',
                                                    width: '25%',
                                                    maxWidth: '100%',
                                                    height: '31%',
                                                    maxHeight: '100%',
                                                    zIndex: '999',
                                                    borderRadius: '8px',
                                                    padding: '10px 20px 40px'
                                                },
                                                content: {
                                                    position: 'absolute',
                                                    top: '0px',
                                                    left: '0px',
                                                    right: '0px',
                                                    bottom: '0px',
                                                    background: '#F0F0F0',
                                                    overflow: 'auto',
                                                    WebkitOverflowScrolling: 'touch',
                                                    borderRadius: '4px',
                                                    outline: 'none',
                                                    padding: '20px',
                                                    display: 'flex',
                                                    flexDirection: 'column',
                                                    alignItems: 'center',
                                                    width: '100%'
                                                }
                                            }}
                                        >
                                            <p style={{ padding: '40px 30px 20px 30px', fontSize: '20px' }}>Are you sure you want to delete?</p>

                                            <div style={{ display: "flex", flexDirection: "row", width: "100%", justifyContent: "flex-end", paddingTop: "10px" }}>

                                                <div style={{ width: '20%' }}>
                                                    <button style={{ padding: '5px 15px' }} className="button" onClick={() => { this.close(); this.deleteStudent() }}>Yes</button>
                                                </div>

                                                <div style={{ width: '20%' }}>
                                                    <button style={{ color: 'black', backgroundColor: 'lightgray', padding: '5px 15px' }} className="button" onClick={this.close}>No</button>
                                                </div>

                                            </div>
                                        </Modal>

                                </li>
                            ))
                        }
                    </ul>

                </div>

            </div >
        );
    }
}

export default ListStudents;
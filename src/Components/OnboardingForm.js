import React, { Component } from 'react';
import Modal from "react-modal";

Modal.setAppElement('#root')
class OnboardingForm extends Component {

    constructor() {
        super();
        this.state = {
            id: '',
            studentName: '',
            category: '',
            domicileDoc: false,
            birthDoc: false,
            marksheetDoc: false,
            policeClearanceDoc: false,
            passportDoc: false,
            declarationDoc: false,
            dob: '',
            fathersName: '',
            mothersName: '',
            lastScore: '',
            dialogOpen: false
        }
    }

    valueChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    docChange = (e) => {
        this.setState({
            [e.target.name]: e.target.checked
        })
    }

    validateForm = () => {
        if (this.state.category === 'International' && this.state.studentName &&
            this.state.domicileDoc && this.state.marksheetDoc &&
            this.state.passportDoc && this.state.policeClearanceDoc &&
            this.state.birthDoc && this.state.declarationDoc) {
            return true
        }
        else if (this.state.category === 'Domestic' && this.state.studentName &&
            this.state.domicileDoc && this.state.marksheetDoc &&
            this.state.birthDoc && this.state.declarationDoc) {
            return true
        }
        return false
    }

    submitForm = () => {
        const isValid = this.validateForm();

        if (isValid === true) {
            fetch('http://localhost:4000/students', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(this.state)
            })
                .then(res => res.json)
                .then(data => {
                    this.navigateToStudents();
                })
        }
        else {
            this.open()
        }

    }

    open = () => this.setState({ dialogOpen: true })
    close = () => this.setState({ dialogOpen: false })

    navigateToOnboard = () => {
        this.props.history.push('/addStudent')
    }

    navigateToStudents = () => {
        this.props.history.push('/students')
    }

    render() {
        return (
            <div >

                <div className="header">
                    <button style={{ backgroundColor: "darkblue", color: "white" }} className="header-buttons" onClick={() => this.navigateToOnboard()}>Onboarding Form</button>
                    <button className="header-buttons" onClick={() => this.navigateToStudents()}>List Students</button>
                </div>

                <div style={{ border: '1.5px darkblue', borderStyle: 'solid' }} className="home">
                    <p style={{ fontSize: '24px', fontFamily: 'sans-serif', color: 'darkblue' }}>Onboarding Form</p>

                    <table>
                        <tbody>
                            <tr>
                                <td className="left">
                                    <div>
                                        Student Name
                                    <span style={{ color: 'darkblue', fontWeight: 'bold', padding: '1px', fontSize: '25px' }}>*</span>
                                    </div>
                                </td>
                                <td className="right">
                                    <input className="input" name="studentName" type="text" value={this.state.studentName} placeholder="Name" onChange={(e) => this.valueChange(e)}></input>
                                </td>
                            </tr>

                            <tr>
                                <td className="left">
                                    <div>
                                        Category
                                    <span style={{ color: 'darkblue', fontWeight: 'bold', padding: '1px', fontSize: '25px' }}>*</span>
                                    </div>
                                </td>
                                <td className="right">
                                    <select className="input" name="category" value={this.state.category} onChange={(e) => this.valueChange(e)}>
                                        <option value="">Category</option>
                                        <option value="Domestic">Domestic</option>
                                        <option value="International">International</option>
                                    </select>
                                </td>
                            </tr>

                            <tr>
                                <td className="left">
                                    Documents
            </td>
                                <td className="right">
                                    <div className="check">
                                        <label style={{ width: "90%" }}>Domicile<span style={{ color: 'darkblue', fontWeight: 'bold', padding: '1px', fontSize: '25px' }}>*</span></label>
                                        <input style={{ width: "15px" }} className="input" name="domicileDoc" type="checkbox" value={this.state.domicileDoc} onChange={(e) => this.docChange(e)}></input>
                                    </div>

                                    <div className="check">
                                        <label style={{ width: "90%" }}>Birth Certificate<span style={{ color: 'darkblue', fontWeight: 'bold', padding: '1px', fontSize: '25px' }}>*</span></label>
                                        <input style={{ width: "15px" }} className="input" name="birthDoc" type="checkbox" value={this.state.birthDoc} onChange={(e) => this.docChange(e)}></input>
                                    </div>

                                    <div className="check">
                                        <label style={{ width: "90%" }}>Marksheets<span style={{ color: 'darkblue', fontWeight: 'bold', padding: '1px', fontSize: '25px' }}>*</span></label>
                                        <input style={{ width: "15px" }} className="input" name="marksheetDoc" type="checkbox" value={this.state.marksheetDoc} onChange={(e) => this.docChange(e)}></input>
                                    </div>

                                    <div className="check">
                                        <label style={{ width: "90%" }}>
                                            Police clearance
                                            {
                                                this.state.category !== 'Domestic' &&
                                                <span style={{ color: 'darkblue', fontWeight: 'bold', padding: '1px', fontSize: '25px' }}>*</span>
                                            }
                                        </label>
                                        <input style={{ width: "15px" }} className="input" name="policeClearanceDoc" type="checkbox" value={this.state.policeClearanceDoc} onChange={(e) => this.docChange(e)}></input>
                                    </div>

                                    <div className="check">
                                        <label style={{ width: "90%" }}>
                                            Passport
                                            {
                                                this.state.category !== 'Domestic' &&
                                                <span style={{ color: 'darkblue', fontWeight: 'bold', padding: '1px', fontSize: '25px' }}>*</span>
                                            }
                                        </label>
                                        <input style={{ width: "15px" }} className="input" name="passportDoc" type="checkbox" value={this.state.passportDoc} onChange={(e) => this.docChange(e)}></input>
                                    </div>

                                    <div className="check">
                                        <label style={{ width: "90%" }}>Declaration<span style={{ color: 'darkblue', fontWeight: 'bold', padding: '1px', fontSize: '25px' }}>*</span></label>
                                        <input style={{ width: "15px" }} className="input" name="declarationDoc" type="checkbox" value={this.state.declarationDoc} onChange={(e) => this.docChange(e)}></input>
                                    </div>

                                </td>
                            </tr>

                            <tr>
                                <td className="left">
                                    DOB
                    </td>
                                <td className="right">
                                    <input className="input" name="dob" type="date" value={this.state.dob} placeholder="DOB(calendar)" onChange={(e) => this.valueChange(e)}></input>
                                </td>
                            </tr>

                            <tr>
                                <td className="left">
                                    Father's Name
                    </td>
                                <td className="right">
                                    <input className="input" name="fathersName" type="text" value={this.state.fathersName} placeholder="Father's Name" onChange={(e) => this.valueChange(e)}></input>
                                </td>
                            </tr>

                            <tr>
                                <td className="left">
                                    Mother's Name
                    </td>
                                <td className="right">
                                    <input className="input" name="mothersName" type="text" value={this.state.mothersName} placeholder="Mother's Name" onChange={(e) => this.valueChange(e)}></input>
                                </td>
                            </tr>

                            <tr>
                                <td className="left">
                                    Last class score
                    </td>
                                <td className="right">
                                    <input className="input" name="lastScore" type="text" value={this.state.lastScore} placeholder="%(marks)" onChange={(e) => this.valueChange(e)}></input>
                                </td>
                            </tr>

                        </tbody>
                    </table>
                    <div>
                        <button style={{ marginTop: '20px', marginBottom: '20px', padding: '10px 80px', fontSize: '18px' }} className="button" onClick={() => this.submitForm()}>Onboard</button>
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
                    <p style={{ padding: '40px 30px 20px 30px', fontSize: '20px' }}>Fill all the mandatory fields!</p>

                    <div style={{ display: "flex", flexDirection: "row", width: "100%", justifyContent: "flex-end", paddingTop: "10px" }}>

                        <div style={{ width: '30%' }}>
                            <button style={{ padding: '5px 20px' }} className="button" onClick={() => { this.close(); }}>Ok</button>
                        </div>

                    </div>
                </Modal>

            </div>
        );
    }
}

export default OnboardingForm;
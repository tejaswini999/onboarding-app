import React, { Component } from 'react';

class ViewStudent extends Component {

    constructor() {
        super();
        this.state = {
            studentDetails: null
        }
    }

    componentDidMount() {
        const studentId = this.props.match.params.studentId;
        this.getStudentDetails(studentId);
    }

    getStudentDetails = (studentId) => {
        fetch(`http://localhost:4000/students/${studentId}`)
            .then(res => res.json())
            .then(data => {
                this.setState({
                    studentDetails: data
                })
            });
    }

    navigateToOnboard = () => {
        this.props.history.push('/addStudent')
    }

    navigateToStudents = () => {
        this.props.history.push('/students')
    }

    editOnboard = (student) => {
        this.props.history.push(`/editOnboard/${student.id}`)
    }

    render() {
        return (
            <div>
                <div className="header">
                    <button style={{ backgroundColor: "darkblue", color: "white" }} className="header-buttons" onClick={() => this.navigateToOnboard()}>Onboarding Form</button>
                    <button className="header-buttons" onClick={() => this.navigateToStudents()}>List Students</button>
                </div>

                <div style={{ border: '1.5px darkblue', borderStyle: 'solid' }} className="home">
                    <p style={{ fontSize: '24px', fontFamily: 'sans-serif', color: 'darkblue' }}>Onboarding Form(View)</p>
                    {
                        this.state.studentDetails &&
                        <div>
                            <table>
                                <tbody>
                                    <tr>
                                        <td style={{ padding: '10px' }} className="left">
                                            <div>
                                                Student Name
                                    <span style={{ color: 'darkblue', fontWeight: 'bold', padding: '1px', fontSize: '25px' }}>*</span>
                                            </div>
                                        </td>
                                        <td style={{ padding: '10px', height: '20px', backgroundColor: 'lightgray' }} className="right">
                                            {this.state.studentDetails.studentName}
                                        </td>
                                    </tr>

                                    <tr>
                                        <td style={{ padding: '10px' }} className="left">
                                            <div>
                                                Category
                                    <span style={{ color: 'darkblue', fontWeight: 'bold', padding: '1px', fontSize: '25px' }}>*</span>
                                            </div>
                                        </td>
                                        <td style={{ padding: '10px', height: '20px', backgroundColor: 'lightgray' }} className="right">
                                            {this.state.studentDetails.category}
                                        </td>
                                    </tr>

                                    <tr>
                                        <td style={{ padding: '10px' }} className="left">
                                            Documents
                            </td>
                                        <td className="right">
                                            <div style={{ padding: '10px' }} className="check">
                                                <label style={{ width: "90%" }}>Domicile<span style={{ color: 'darkblue', fontWeight: 'bold', padding: '1px', fontSize: '25px' }}>*</span></label>
                                                <input style={{ width: "10%" }} type="checkbox" defaultChecked={this.state.studentDetails.domicileDoc} disabled="disabled"></input>
                                            </div>

                                            <div style={{ padding: '10px' }} className="check">
                                                <label style={{ width: "90%", paddingBottom: '5px' }}>Birth Certificate<span style={{ color: 'darkblue', fontWeight: 'bold', padding: '1px', fontSize: '25px' }}>*</span></label>
                                                <input style={{ width: "10%" }} type="checkbox" defaultChecked={this.state.studentDetails.birthDoc} disabled="disabled"></input>
                                            </div>

                                            <div style={{ padding: '10px' }} className="check">
                                                <label style={{ width: "90%" }}>Marksheets<span style={{ color: 'darkblue', fontWeight: 'bold', padding: '1px', fontSize: '25px' }}>*</span></label>
                                                <input style={{ width: "10%" }} type="checkbox" defaultChecked={this.state.studentDetails.marksheetDoc} disabled="disabled"></input>
                                            </div>

                                            <div style={{ padding: '10px' }} className="check">
                                                <label style={{ width: "90%" }}>
                                                    Police clearance
                                                    {
                                                        this.state.studentDetails.category !== 'Domestic' &&
                                                        <span style={{ color: 'darkblue', fontWeight: 'bold', padding: '1px', fontSize: '25px' }}>*</span>
                                                    }
                                                </label>
                                                <input style={{ width: "10%" }} type="checkbox" defaultChecked={this.state.studentDetails.policeClearanceDoc} disabled="disabled"></input>
                                            </div>

                                            <div style={{ padding: '10px' }} className="check">
                                                <label style={{ width: "90%" }}>
                                                    Passport
                                                    {
                                                        this.state.studentDetails.category !== 'Domestic' &&
                                                        <span style={{ color: 'darkblue', fontWeight: 'bold', padding: '1px', fontSize: '25px' }}>*</span>
                                                    }
                                                </label>
                                                <input style={{ width: "10%" }} type="checkbox" defaultChecked={this.state.studentDetails.passportDoc} disabled="disabled"></input>
                                            </div>

                                            <div style={{ padding: '10px' }} className="check">
                                                <label style={{ width: "90%" }}>Declaration<span style={{ color: 'darkblue', fontWeight: 'bold', padding: '1px', fontSize: '25px' }}>*</span></label>
                                                <input style={{ width: "10%" }} type="checkbox" defaultChecked={this.state.studentDetails.declarationDoc} disabled="disabled"></input>
                                            </div>

                                        </td>
                                    </tr>

                                    <tr>
                                        <td style={{ padding: '10px' }} className="left">
                                            DOB
                                    </td>
                                        <td style={{ padding: '10px', height: '20px', backgroundColor: 'lightgray' }} className="right">
                                            {this.state.studentDetails.dob}
                                        </td>
                                    </tr>

                                    <tr>
                                        <td style={{ padding: '10px' }} className="left">
                                            Father's Name
                                    </td>
                                        <td style={{ padding: '10px', height: '20px', backgroundColor: 'lightgray' }} className="right">
                                            {this.state.studentDetails.fathersName}
                                        </td>
                                    </tr>

                                    <tr>
                                        <td style={{ padding: '10px' }} className="left">
                                            Mother's Name
                                    </td>
                                        <td style={{ padding: '10px', height: '20px', backgroundColor: 'lightgray' }} className="right">
                                            {this.state.studentDetails.mothersName}
                                        </td>
                                    </tr>

                                    <tr>
                                        <td style={{ padding: '10px' }} className="left">
                                            Last class score
                                    </td>
                                        <td style={{ padding: '10px', height: '20px', backgroundColor: 'lightgray' }} className="right">
                                            {this.state.studentDetails.lastScore}
                                        </td>
                                    </tr>

                                </tbody>
                            </table>
                        </div>
                    }
                    <div>
                        <button style={{ backgroundColor: "gray", color: "white", cursor: 'auto', marginTop: '20px', marginBottom: '20px', padding: '10px 80px', fontSize: '18px' }} className="button">Onboard</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default ViewStudent;
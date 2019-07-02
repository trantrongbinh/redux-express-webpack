import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import { registerUser } from '../../actions/users';

class Register extends Component {
    render() {

        return (
            <div>
                <h3>RegisterPage</h3>
                {!isSuccess ? <div>{message}</div> : <Redirect to='login' />}
                <form>
                    <div>
                        <label htmlFor="name">Name</label>
                        <input type="text" name="name" id="name" />
                    </div>
                    <div>
                        <label htmlFor="email">Email</label>
                        <input type="email" name="email" id="email" />
                    </div>
                    <div>
                        <label htmlFor="password">Password</label>
                        <input type="password" name="password" id="password" />
                    </div>
                    <div>
                        <button>Register</button>
                    </div>
                </form>
                Already have account? <Link to='login'>Login here</Link>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return { response: state }
}

export default connect(mapStateToProps, null)(Register);

import React from 'react'
import ReactDOM from 'react-dom'
import './loginSignupPanel.css';
import $ from 'jquery';
import robot from './img/robot_avatar_happy.png'
import * as Auth from './authmanager.js';
import * as popup from './popups.js';
import Signup from './signup.js';

const login = () => (
    <div id="loginPanel" className="bottom-arrow" style={{
        height: '370px',
        minWidth: '400px',
        backgroundColor: '#fff',
        borderRadius: '10px',
        marginTop: '10px',
        padding: '15px',
        textAlign: 'center',
        position: 'relative',
    }}>
        <h2 style={{ color: 'black', fontSize: '20px' }}>PLEASE ENTER YOUR DETAILS TO LOGIN</h2>
        <div style={{
            width: '100%',
            backgroundColor: '#ddf0fe',
            padding: '10px'
        }}>

            <div className="input-box">
                <label htmlFor="firstname">First name</label>
                <input type="text" name="firstname" id="firstname" placeholder="First name" />
            </div>
            <div className="input-box">
                <label htmlFor="firstname">Last name</label>
                <input type="text" name="lastname" id="last name" placeholder="Last name" />
            </div><br /><br />
            <div className="input-box" >
                <label>Date of Birth</label>
                <select name="day" id="B-day" class="custom-select mb-0" required="">
                    <option value="" disabled="" selected="" hidden="">Day</option>
                    <option value="01">01</option>
                    <option value="02">02</option>
                    <option value="03">03</option>
                    <option value="04">04</option>
                    <option value="05">05</option>
                    <option value="06">06</option>
                    <option value="07">07</option>
                    <option value="08">08</option>
                    <option value="09">09</option>
                    <option value="10">10</option>
                    <option value="11">11</option>
                    <option value="12">12</option>
                    <option value="13">13</option>
                    <option value="14">14</option>
                    <option value="15">15</option>
                    <option value="16">16</option>
                    <option value="17">17</option>
                    <option value="18">18</option>
                    <option value="19">19</option>
                    <option value="20">20</option>
                    <option value="21">21</option>
                    <option value="22">22</option>
                    <option value="23">23</option>
                    <option value="24">24</option>
                    <option value="25">25</option>
                    <option value="26">26</option>
                    <option value="27">27</option>
                    <option value="28">28</option>
                    <option value="29">29</option>
                    <option value="30">30</option>
                    <option value="31">31</option>
                </select>
                <select name="month" id="B-month" class="custom-select mb-0" required="">
                    <option value="" disabled="" selected="" hidden="">Month</option>
                    <option value="01">Jan</option>
                    <option value="02">Feb</option>
                    <option value="03">Mar</option>
                    <option value="04">Apr</option>
                    <option value="05">May</option>
                    <option value="06">June</option>
                    <option value="07">July</option>
                    <option value="08">Aug</option>
                    <option value="09">Sept</option>
                    <option value="10">Oct</option>
                    <option value="11">Nov</option>
                    <option value="12">Dec</option>
                </select>
                <select name="year" id="B-year" class="custom-select mb-0" required="">
                    <option value="" disabled="" selected="" hidden="">Year</option>
                    <option value="2020">2020</option>
                    <option value="2019">2019</option>
                    <option value="2018">2018</option>
                    <option value="2017">2017</option>
                    <option value="2016">2016</option>
                    <option value="2015">2015</option>
                    <option value="2014">2014</option>
                    <option value="2013">2013</option>
                    <option value="2012">2012</option>
                    <option value="2011">2011</option>
                    <option value="2010">2010</option>
                    <option value="2009">2009</option>
                    <option value="2008">2008</option>
                    <option value="2007">2007</option>
                    <option value="2006">2006</option>
                    <option value="2005">2005</option>
                    <option value="2004">2004</option>
                    <option value="2003">2003</option>
                    <option value="2002">2002</option>
                    <option value="2001">2001</option>
                    <option value="2000">2000</option>
                    <option value="1999">1999</option>
                    <option value="1998">1998</option>
                    <option value="1997">1997</option>
                    <option value="1996">1996</option>
                    <option value="1995">1995</option>
                    <option value="1994">1994</option>
                    <option value="1993">1993</option>
                    <option value="1992">1992</option>
                    <option value="1991">1991</option>
                    <option value="1990">1990</option>
                    <option value="1989">1989</option>
                    <option value="1988">1988</option>
                    <option value="1987">1987</option>
                    <option value="1986">1986</option>
                    <option value="1985">1985</option>
                    <option value="1984">1984</option>
                    <option value="1983">1983</option>
                    <option value="1982">1982</option>
                    <option value="1981">1981</option>
                    <option value="1980">1980</option>
                    <option value="1979">1979</option>
                    <option value="1978">1978</option>
                    <option value="1977">1977</option>
                    <option value="1976">1976</option>
                    <option value="1975">1975</option>
                    <option value="1974">1974</option>
                    <option value="1973">1973</option>
                    <option value="1972">1972</option>
                    <option value="1971">1971</option>
                    <option value="1970">1970</option>
                    <option value="1969">1969</option>
                    <option value="1968">1968</option>
                    <option value="1967">1967</option>
                    <option value="1966">1966</option>
                    <option value="1965">1965</option>
                    <option value="1964">1964</option>
                    <option value="1963">1963</option>
                    <option value="1962">1962</option>
                    <option value="1961">1961</option>
                    <option value="1960">1960</option>
                    <option value="1959">1959</option>
                    <option value="1958">1958</option>
                    <option value="1957">1957</option>
                    <option value="1956">1956</option>
                    <option value="1955">1955</option>
                    <option value="1954">1954</option>
                    <option value="1953">1953</option>
                    <option value="1952">1952</option>
                    <option value="1951">1951</option>
                    <option value="1950">1950</option>
                    <option value="1949">1949</option>
                    <option value="1948">1948</option>
                    <option value="1947">1947</option>
                    <option value="1946">1946</option>
                    <option value="1945">1945</option>
                    <option value="1944">1944</option>
                    <option value="1943">1943</option>
                    <option value="1942">1942</option>
                    <option value="1941">1941</option>
                    <option value="1940">1940</option>
                    <option value="1939">1939</option>
                    <option value="1938">1938</option>
                    <option value="1937">1937</option>
                    <option value="1936">1936</option>
                    <option value="1935">1935</option>
                    <option value="1934">1934</option>
                    <option value="1933">1933</option>
                    <option value="1932">1932</option>
                    <option value="1931">1931</option>
                    <option value="1930">1930</option>
                    <option value="1929">1929</option>
                    <option value="1928">1928</option>
                    <option value="1927">1927</option>
                    <option value="1926">1926</option>
                    <option value="1925">1925</option>
                    <option value="1924">1924</option>
                    <option value="1923">1923</option>
                    <option value="1922">1922</option>
                    <option value="1921">1921</option>
                    <option value="1920">1920</option>
                </select>
            </div><br />
        </div><br />
        <div className="input-box">
            <button style={{ backgroundColor: '#777' }} onClick={() => Auth.clearShadow()}>MAYBE LATER</button>
            <button style={{ backgroundColor: '#ff6a00' }} onClick={() => {
                if (Auth.validateForm('#loginPanel input[type="text"], #loginPanel select')) {
                    var info = Auth.getValue('#loginPanel input[type="text"], #loginPanel select');
                    Auth.signIn(info.join('').toLowerCase().replace(' ', '') + '@codetribe.org', info.join('').toLowerCase().replace(' ', ''))
                        .then(res => {
                            Auth.fromLocalToFirestoreCode();
                        }).catch(err => {
                            ReactDOM.render(<popup.Loginfailed message={err.message} />, document.querySelector('.hide-body-shadow'));
                        });
                    Auth.change((user) => {
                        if (user) {
                            Auth.setUser(info.join('').toLowerCase().replace(' ', ''), info[0]);
                            ReactDOM.unmountComponentAtNode(document.querySelector('.hide-body-shadow'));
                            ReactDOM.render(<popup.Loginsuccessfull />, document.querySelector('.hide-body-shadow'));
                        }
                    })
                }
            }}>SIGN IN</button>
        </div><br /><br />
        <label style={{ color: 'black', cursor: 'pointer', margin: '5px' }} onClick={() => {
            ReactDOM.render(<Signup />, document.querySelector('.hide-body-shadow'));
            $('.login-signup-container').css({ 'z-index': 0 });
        }}>Already have an account? <span style={{ color: 'blue' }}>Sign up</span></label>
        <div style={{
            position: 'absolute',
            top: '5px',
            right: '10px',
            cursor: 'pointer',
            color: 'gray',
            padding: '5px',
            fontSize: '25px',
            fontWeight: 'bold'
        }} className="clear-login-panel"
            onClick={() => {
                ReactDOM.unmountComponentAtNode(document.querySelector('.hide-body-shadow'));
                $('.login-signup-container').css({ 'z-index': 2000 });
            }}>X</div>
        <div style={{
            height: '150px',
            width: '150px',
            position: 'absolute',
            top: '105%',
            left: '50%',
        }}>
            <img src={robot} alt="" style={{
                height: '100%',
                width: '100%',
                position: 'relative',
                left: '-50%',
            }} />
        </div>
    </div>
)
export default login
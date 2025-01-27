//importing express
const express = require('express');
const app = express();
const port = 3000;

//function to find age 
function calculateAge(dob) {
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
}


app.get('/signup', (req, res) => {
    const { username, email, password, dob } = req.query;

//validating
    if (!/^[a-zA-Z]+$/.test(username)) {
        return res.status(400).send('Invalid username format. Only letters are allowed.');
    }


    if (!email || !email.includes('@') || !email.includes('.') || email.indexOf('@') > email.lastIndexOf('.')) {
        return res.status(400).send('Invalid email format.');
    }


  
    if (!password || password.length < 8) {
        return res.status(400).send('Password must be at least 8 characters long.');
    }

    
    if (!dob || calculateAge(dob) < 18) {
        return res.status(400).send('Users must be 18 or older.');
    }

   
    res.send('Signup successful!');
});

//running server

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});











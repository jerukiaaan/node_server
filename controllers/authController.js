const Badge = require('../models/badgeModel');
const Student = require('../models/studentModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const secretKey = "kiangwapo";

const signIn = async (req, res) => {
  const { email, password } = req.body;
  try {
    const student = await Student.findOne({ email });

    if (!student || !bcrypt.compareSync(password, student.password)) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const token = jwt.sign(
      { studentId: student._id, email: student.email },
      secretKey,
      { expiresIn: '1h' }
    );

    res.json({ token, student });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};


const register = async (req, res) => {
  const { username, password } = req.body;

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Save the user details to the database (replace this with your database logic)

  res.json({ message: 'User registered successfully' });
}

const changePass = async (req, res) => {
  const { email, password } = req.body;
  try{
  const hashedPassword = await bcrypt.hash(password, 10);
    const student = await Student.findOneAndUpdate({ email }, { password: hashedPassword });

    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }
    return res.status(200).json({ message: 'Password changed successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
}



module.exports = {
  signIn,
  register,
  changePass
};
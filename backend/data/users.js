import bcrypt from 'bcryptjs';

const users = [
    {
        name: 'rahdirigs-admin',
        email: 'admin@justbuy.com',
        password: bcrypt.hashSync('mrmitb2022', 10),
        contact: '7411858583',
        isAdmin: true,
        isPremium: true,
    },
    {
        name: 'rahdirigs-the-first',
        email: 'rahdirigs@gmail.com',
        password: bcrypt.hashSync('mrmitb2022', 10),
        contact: '6361756397',
        isPremium: true,
    },
    {
        name: 'rahdirigs-the-second',
        email: 'geeks2022@gmail.com',
        password: bcrypt.hashSync('mrmitb2022', 10),
        contact: '7411858583',
    },
];

export default users;

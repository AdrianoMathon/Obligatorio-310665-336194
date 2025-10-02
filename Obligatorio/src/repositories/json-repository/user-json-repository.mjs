import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class UserJsonRepository {
    constructor() {
        this.usersFilePath = path.join(__dirname, '../data/users-test.json');
        this.loadUsers();
    }

    loadUsers() {
        try {
            const data = fs.readFileSync(this.usersFilePath, 'utf8');
            this.users = JSON.parse(data);
        } catch (error) {
            console.error('Error loading users from JSON:', error);
            this.users = [];
        }
    }

    saveUsers() {
        try {
            fs.writeFileSync(this.usersFilePath, JSON.stringify(this.users, null, 2));
        } catch (error) {
            console.error('Error saving users to JSON:', error);
            throw error;
        }
    }

    async createUser(userData) {
        try {
            // Simular ID de MongoDB
            const newId = this.generateObjectId();
            const timestamp = new Date().toISOString();
            
            const newUser = {
                _id: newId,
                ...userData,
                createdAt: timestamp,
                updatedAt: timestamp
            };

            // Verificar si el email ya existe
            const existingUser = this.users.find(user => user.email === userData.email);
            if (existingUser) {
                throw new Error('Email already exists');
            }

            this.users.push(newUser);
            this.saveUsers();
            
            return newUser;
        } catch (error) {
            console.error('Error creating user:', error);
            throw error;
        }
    }

    async getUserByEmail({ email }) {
        try {
            const user = this.users.find(user => user.email === email);
            if (!user) {
                throw new Error('User not found');
            }
            return user;
        } catch (error) {
            console.error('Error getting user by email:', error);
            throw error;
        }
    }

    async getAllUsers() {
        return this.users;
    }

    async getUserById(id) {
        try {
            const user = this.users.find(user => user._id === id);
            if (!user) {
                throw new Error('User not found');
            }
            return user;
        } catch (error) {
            console.error('Error getting user by ID:', error);
            throw error;
        }
    }

    async updateUser(id, updateData) {
        try {
            const userIndex = this.users.findIndex(user => user._id === id);
            if (userIndex === -1) {
                throw new Error('User not found');
            }

            this.users[userIndex] = {
                ...this.users[userIndex],
                ...updateData,
                updatedAt: new Date().toISOString()
            };

            this.saveUsers();
            return this.users[userIndex];
        } catch (error) {
            console.error('Error updating user:', error);
            throw error;
        }
    }

    async deleteUser(id) {
        try {
            const userIndex = this.users.findIndex(user => user._id === id);
            if (userIndex === -1) {
                throw new Error('User not found');
            }

            const deletedUser = this.users.splice(userIndex, 1)[0];
            this.saveUsers();
            return deletedUser;
        } catch (error) {
            console.error('Error deleting user:', error);
            throw error;
        }
    }

    // Generar un ObjectId similar a MongoDB
    generateObjectId() {
        const timestamp = Math.floor(Date.now() / 1000).toString(16);
        const randomBytes = Array.from({length: 16}, () => Math.floor(Math.random() * 16).toString(16)).join('');
        return timestamp + randomBytes.substring(0, 16);
    }
}

export default new UserJsonRepository();
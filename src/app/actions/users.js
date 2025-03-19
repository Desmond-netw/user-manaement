'use server';

import { prisma } from "@/libs/prisma";
import { revalidatePath } from "next/cache";

export async function getUsers() {
    try {
        const users = await prisma.user.findMany();
        return { users };
    } catch (error) {
        console.error("Failed to get users:", error);
        return { error: "Failed to fetch users" };
    }
}

// ------------ Create User 
export async function createUser(formData) {
    try {
        const name = formData.get('name')?.trim();
        const email = formData.get('email')?.trim();

        if (!name || !email) {
            return { error: "Name and email are required" };
        }

        const user = await prisma.user.create({
            data: { name, email }
        });
        revalidatePath('/');
        return { user };
    } catch (error) {
        console.error("Failed to create user:", error);
        return { error: 'Failed to create user', details: error };
    }
}

export async function updateUser(formData) {
    try {
        const id = parseInt(formData.get('id'));
        const name = formData.get('name')?.trim();
        const email = formData.get('email')?.trim();

        if (!id || !name || !email) {
            return { error: "Invalid input: ID, name, and email are required" };
        }

        const user = await prisma.user.update({
            where: { id },
            data: { name, email }
        });
        revalidatePath('/');
        return { user };
    } catch (error) {
        console.error("Failed to update user:", error);
        return { error: 'Failed to update user' };
    }
}

export async function deleteUser(formData) {
    try {
        const id = parseInt(formData.get('id'));

        if (!id) {
            return { error: "Invalid user ID" };
        }

        await prisma.user.delete({
            where: { id }
        });
        revalidatePath('/');
        return { success: true };
    } catch (error) {
        console.error("Failed to delete user:", error);
        return { error: 'Failed to delete user' };
    }
}

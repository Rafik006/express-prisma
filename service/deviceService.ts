import { findAllDevices } from '../model/deviceModel';

export async function findAll() {
    return findAllDevices();
}
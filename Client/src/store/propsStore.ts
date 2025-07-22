import { create } from 'zustand';
import axios from '../utils/API';
import toast from 'react-hot-toast';

export interface propStr {
    _id: string,
    name: string,
    description: string,
    image: string,
    public_id: string,
    isAvailable: boolean,

    createdAt?: Date,
    updatedAt?: Date
};

interface propsStruct {
    props: propStr[];

    getAllProps: () => Promise<void>;
    createProps: (prop: object) => Promise<void>;
    updateProp: () => Promise<void>;
    deleteProp: (id: String) => Promise<void>;
};

const usePropsStore = create<propsStruct>((set, get) => ({
    props: [],

    getAllProps: async () => {
        try {
            const res = await axios.get('/props/getAllprops');
            console.log(res);
            set({ props: res.data.props });
            console.log(res.data.props);
        } catch (error: any) {
            toast.error(error?.response?.data?.message?.message || "Failed to fetch props");
        }
    },

    createProps: async (prop) => {
        try {
            await toast.promise(
                axios.post('/props/createprops', prop),
                {
                    loading: 'Creating props...',
                    success: (res) => res.data.message || 'Props created successfully',
                    error: (err) =>
                        err?.response?.data?.message || 'Something went wrong while creating props',
                }
            );

            await get().getAllProps();
        } catch (error) {
            console.log("createProps error", error);
        }
    },

    updateProp: async () => {
        try {
            await toast.promise(
                axios.put('/props/updateProps'),
                {
                    loading: 'Updating props...',
                    success: (res) => res.data.message || 'Props updated successfully',
                    error: (err) =>
                        err?.response?.data?.message || 'Something went wrong while updating props',
                }
            )

            await get().getAllProps();
        } catch (error) {
            console.log("updateProp error", error);
        }
    },

    deleteProp: async (id: String) => {
        try {
            await toast.promise(
                axios.delete(`/props/deleteProps/${id}`),
                {
                    loading: 'Deleting props...',
                    success: (res) => res.data.message || 'Props deleted successfully',
                    error: (err) =>
                        err?.response?.data?.message || 'Something went wrong while deleting props',
                }
            )

            await get().getAllProps();
        } catch (error) {
            console.log("deleteProp error", error);
        }
    }
}));

export default usePropsStore;
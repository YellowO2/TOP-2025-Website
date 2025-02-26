import Image from 'next/image';

export default function ImagePage({ params }) {
    const { src } = params;

    return (
        <div className='h-screen w-screen flex items-center justify-center'>
            <h1>Event Image: {src}</h1>
        </div>
    );
}

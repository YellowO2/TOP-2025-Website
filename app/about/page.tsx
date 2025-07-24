import Information from "@/components/About/Information"
import Introduction from "@/components/About/Introduction"

function About() {
    return (
        <div className='flex flex-col w-full items-center justify-center'>
            <Introduction />
            <Information />
        </div>
    )
}

export default About
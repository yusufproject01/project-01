

function Text({children} : any) {
    return (
        <div>
            {children}
        </div>
    )
}

interface TitleProps {
    text: string
}
function Title({text} : TitleProps) {
    return (
        <h1 className="text-4xl font-bold">
            {text}
        </h1>
    )
}

function SubTitle({text} : TitleProps) {
    return (
        <h1 className="text-lg font-semibold">
            {text}
        </h1>
    )
}

Text.Title = Title
Text.SubTitle = SubTitle

export default Text
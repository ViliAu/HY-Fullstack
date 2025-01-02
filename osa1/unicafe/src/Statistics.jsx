import StatisticsLine from "./StatisticsLine";

const Statistics = ({good, neutral, bad}) => {

    const total = () => good + neutral + bad;

    if (total() <= 0) {
        return (
            <>
                <h1>statistics</h1>
                <h2>no feedback given</h2>
            </>
        )
    }
    return (
        <>
            <h1>statistics</h1>
            <table>
                <tbody>
                    <StatisticsLine text={'good'} val={good}/>
                    <StatisticsLine text={'neutral'} val={neutral}/>
                    <StatisticsLine text={'bad'} val={bad}/>
                    <StatisticsLine text={'average'} val={((good - bad)/total()).toFixed(2)}/>
                    <StatisticsLine text={'positive'} val={`${(good / total() * 100).toFixed(2)}%`}/>
                </tbody>
            </table>
        </>
    )
}

export default Statistics;
import { useState } from "react"

const FilterGrid = ({ grid = [], onFilter }: { grid: any[], onFilter: (grid: any) => void }) => {
    const gridInitialValue: any = {};
    grid.forEach(grid => {
        gridInitialValue[grid.effect_on] = '';
    })
    const [gridValues, setGridValues] = useState(gridInitialValue)

    return <div className="filter__grid__holder">
        <div className="filter__grid">
            {grid.map((gridItem, index) => <div className="grid__item" key={index}>
                <Grid value={gridValues[gridItem.effect_on]} condition={gridItem.condition} type={gridItem.type} effect_on={gridItem.effect_on} key={index} onChange={(val) => {
                    setGridValues({ ...gridValues, [gridItem.effect_on]: val })
                }} />
            </div>)}
            <div className="grid__item grid__item--filter">
                <button className="btn btn-primary btn-md" onClick={() => { onFilter(gridValues) }}>Search</button>
                <button className="btn btn-primary btn-md" onClick={() => { onFilter(gridInitialValue) }}>Reset</button>
            </div>
        </div>
    </div>
}
const Grid = ({ condition, type, effect_on, onChange, value }: { value: any, condition: string, type: string, effect_on: string, onChange: (val: any) => void }) => {
    switch (type) {
        case "number":
            return <input className="input" value={value} type="number" name={effect_on} onChange={(e) => onChange(e.target.value)} />
            break;
        case "string":
            return <input className="input" type="text" value={value} name={effect_on} onChange={(e) => onChange(e.target.value)} />
            break;
        case "date":
            break;
        default:
            return null;
    }
}
export default FilterGrid;
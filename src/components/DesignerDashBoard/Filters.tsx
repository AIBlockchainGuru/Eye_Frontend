import React from "react";

type Filter = {
	name: string;
	values: string[];
};

type Props = {
	filters: Filter[];
};

const Filters = (props: Props) => {
	return (
		<div className="flex flex-col gap-5">
			{props.filters.map((filter, index) => (
				<Filter key={index} name={filter.name} values={filter.values} />
			))}
		</div>
	);
};

const Filter = (props: Filter) => {
	return (
		<div className="flex flex-col gap-5">
			<h1>{props.name}</h1>

			<div className="flex flex-col gap-2">
				{props.values.map((value, index) => {
					return (
						<div key={value} className="flex flex-row gap-1 justify-between">
							<input type="checkbox" />
							<span>{value}</span>
						</div>
					);
				})}
			</div>
		</div>
	);
};

export default Filters;

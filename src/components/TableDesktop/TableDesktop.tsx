const TableDesktop = () => {
	return (
		<table className="displayAllWords__table">
			<thead className="displayAllWords__table__heading">
				<tr className="displayAllWords__table__heading__row">
					<th className="displayAllWords__table__heading__element ordinal-number-head">
						L.p.
					</th>
					<th className="displayAllWords__table__heading__element title">
						Tytuł
					</th>
					<th className="displayAllWords__table__heading__element">
						Znaczenie
					</th>
					<th className="displayAllWords__table__heading__element">Notatki</th>
				</tr>
			</thead>
			{/* <tbody className="displayAllWords__table__body">
				{allWords.slice(indexOfFirstWord, indexOfLastWord)}
			</tbody> */}
		</table>
	);
};

export default TableDesktop;

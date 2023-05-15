import React, { FormEvent, MouseEvent, useEffect, useState } from "react";
import { WordEntity } from "types";
import { MAIN_URL } from "../../utils/url";
import Pagination from "../Pagination/Pagination";
import EditWord from "./EditWord";
import TableMobile from "../TableMobile/TableMobile";
import TableDesktop from "../TableDesktop/TableDesktop";

interface Props {
	words: WordEntity[];
	onWordsChange: () => void;
}

const Table = ({ words, onWordsChange }: Props) => {
	const [edit, setEdit] = useState(false);
	const [form, setForm] = useState({
		id: "",
		title: "",
		description: "",
		notes: "",
	});
	const [marginForm, setMarginForm] = useState(0);
	const [widthScreen, setWidthScreen] = useState(window.innerWidth);

	const [currentPage, setCurrentPage] = useState(1);
	const [wordsPerPage, setWordsPerPage] = useState(15);

	const removeWord = async (e: MouseEvent<HTMLButtonElement>) => {
		if (!window.confirm("Czy na pewno?")) return;

		const [wordToRemove] = words.filter(
			word => word.id === e.currentTarget.getAttribute("data-id")
		);
		const res = await fetch(`${MAIN_URL}/data/remove/${wordToRemove.id}`, {
			method: "DELETE",
		});

		if (res.status === 200 || res.status === 204) {
			onWordsChange();
		}
	};

	const editWordOn = (e: MouseEvent) => {
		const heightFromTopForm = Number(
			e.currentTarget.parentElement?.parentElement?.offsetTop
		);

		setMarginForm(heightFromTopForm);
		setEdit(true);
		const [wordToEdit] = words.filter(
			word => word.id === e.currentTarget.getAttribute("data-id")
		);

		if (wordToEdit.id === undefined) return null;

		setForm({
			id: wordToEdit?.id,
			title: wordToEdit?.title,
			description: wordToEdit?.description,
			notes: wordToEdit?.notes,
		});
	};
	const editWord = async (e: FormEvent) => {
		e.preventDefault();

		// TODO ten confirm zamienić na jakiś ładny popup
		try {
			if (!window.confirm("Czy chcesz zapisać zmiany?")) return;
			await fetch(`${MAIN_URL}/data/search/${form.id}`, {
				method: "PATCH",
				headers: {
					"Content-type": "application/json",
				},
				body: JSON.stringify({
					id: form.id,
					title: form.title,
					description: form.description,
					notes: form.notes,
				}),
			});
		} catch (e) {
			console.error(e);
		}

		setEdit(false);
		onWordsChange();
		// TODO Poszkać i przypomnieć skąd sie bierze ten refresh
	};

	const indexOfLastWord = currentPage * wordsPerPage;
	const indexOfFirstWord = indexOfLastWord - wordsPerPage;

	const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

	useEffect(() => {
		const handleResize = () => {
			setWidthScreen(window.innerWidth);
		};

		window.addEventListener("resize", handleResize);

		return () => {
			window.removeEventListener("resize", handleResize);
		};
	}, []);

	return (
		<>
			<div className="displayAllWords__table-wrapper">
				{widthScreen > 770 ? (
					<TableDesktop
						words={words}
						editWordOn={editWordOn}
						removeWord={removeWord}
						indexOfFirstWord={indexOfFirstWord}
						indexOfLastWord={indexOfLastWord}
					/>
				) : (
					<TableMobile
						words={words}
						editWordOn={editWordOn}
						removeWord={removeWord}
						indexOfFirstWord={indexOfFirstWord}
						indexOfLastWord={indexOfLastWord}
					/>
				)}
				<Pagination
					wordsPerPage={wordsPerPage}
					totalWords={words.length}
					paginate={paginate}
					currentPage={currentPage}
				/>
				{edit && (
					<EditWord
						form={form}
						setForm={setForm}
						editWord={editWord}
						marginForm={marginForm}
						setEdit={setEdit}
					/>
				)}
			</div>
		</>
	);
};

export default Table;

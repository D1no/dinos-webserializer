/**
 * Created by AProDino on 26.03.15.
 */

	// Mock-Up
var APIoutput = {
	jobId: "wisoapp_fristen",
	date: "I20150325-22:51:02.031",
	url: "https://wisoapp.uni-koeln.de/pruefungsfristen.php",
	fetched: {
		pageTitle: {
			value: "Übersicht aktueller Prüfungstermine",
			label: "Page Title of the Blog",
			jobId: "wisoapp_fristen",
			date: "I20150325-22:51:02.031",
			url: "https://wisoapp.uni-koeln.de/pruefungsfristen.php",
			cssSelector: "#mcont > div > div.ipanel.bl_cont"
		},
		same: {
			same: "but different"
		}
	},
	source: {
		numberColumns: 9,
		numberRows: 90,
		header: [
			{key: "moduleNumber", label: "Module Number of the Exam", value: "Modul"},
			{key: "moduleDescription", label: "Description of the Module", value: "Modulbezeichnung"},
			{key: "moduleNote", label: "Annotations of the Exam", value: "Bemerkung"},
			{key: "examiner", label: "label of the Column", value: "Prüfer"},
			{key: "examDate", label: "label of the Column", value: "Prüfungsdatum"},
			{key: "examTime", label: "label of the Column", value: "Prüfungszeit"},
			{key: "registrationDeadline", label: "label of the Column", value: "columnScrapedValue"},
			{key: "cancellationDeadline", label: "label of the Column", value: "columnScrapedValue"},
			{key: "registrationMode", label: "label of the Column", value: "columnScrapedValue"},
			{key: "numberRegistered", label: "label of the Column", value: "columnScrapedValue"}
		]
	},
	frame: [
		{
			_jobId: "ASFEWADASFNKJASLD",
			_url: "http://asdasdfasdsad.de",
			_page: {
				title: {
					value: "Übersicht aktueller Prüfungstermine",
					label: "Page Title of the Blog",
					jobId: "wisoapp_fristen",
					date: "I20150325-22:51:02.031",
					url: "https://wisoapp.uni-koeln.de/pruefungsfristen.php",
					cssSelector: "#mcont > div > div.ipanel.bl_cont"
				},
				same: {
					same: "but different"
				}
			},
			moduleNumber: {
				value: 1120,
				rowIndex: 23,
				columnIndex: 1,
				label: "Module Number of the Exam",
				jobId: "wisoapp_fristen",
				date: "I20150325-22:51:02.031",
			},
			same: {
				same: "but different"
			},
			_prevRow: {/*Object - keys and value*/},
			_nextRow: {/*Object - keys and value*/},
			/*
			* Change Trail Mock-Up
			* */
			_ctc: "thisCollection_ct", // Change Trail Collection associated with keeping track of this document
			_ctr: 1, // Change Trail Revisions on the Document, amount of iterations inside the log. (_ctl.length)
  			_ctl: [ // log of updates to the document, latest to oldest
					{
						_rev: 1, // revision, starting with 0. First entry _crtl[0]._rev == _ctr.
						_prv: 0, // false for initial version
						_tsp: "13124712398126", // job timestamp
						_job: ObjectId("ASKFHASDASNDASKJNDAS"), // ct job object that tracks all document states and from which this change was made
						_edi: [{
							k: "numberRegistered",
							f: "value", // field that changed, "" if its rootKey
							t: "chg" // "new" "del"
						}],
						moduleNumber: {
							value: 1119,
							rowIndex: 23,
							columnIndex: 1,
							fieldAbove: 0,
							fieldBelow: 1002
						},
						registeredUsers: {
							/*
							 Potentially track further edits
							 _edi: [{
							 	k: "rowIndex",
							 	f: "value", // field that changed, "" if its rootKey
							 	t: "chg" // "new" "del"
							 }],
							 */
							value: 1120,
							rowIndex: 23,
							columnIndex: 1,
							fieldAbove: 0,
							fieldBelow: 1002
						}
					}
					,{
					_rev: 0,
					_tsp: "13124712398126", //timestamp
					_job: ObjectId("ASKFHASDASNDASKJNDAS"), // ct job object that tracks all document states and from which this change was made
					_edi: [{
						key: "numberRegistered",
						fld: "value", // field that changed, "" if its rootKey
						typ: "chg" // "add" "del"
					}],
					_prv: false, // initial version
					moduleNumber: {
						value: 1119,
						rowIndex: 23,
						columnIndex: 1,
						fieldAbove: 0,
						fieldBelow: 1002
					},
					registeredUsers: {
						value: 1120,
						rowIndex: 23,
						columnIndex: 1,
						fieldAbove: 0,
						fieldBelow: 1002
					}
				}
			]
		}
	]
};

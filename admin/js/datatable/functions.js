$(document).ready(function() {
	$.ajax({
			url: 'incluir/process.php',
			type: 'post',
			data: { tag: 'getData'},
			dataType: 'json',
			success: function (data) {
				if (data.success) {
					$.each(data, function (index, record) {
						if ($.isNumeric(index)) { 
							var row = $("<tr />");
							$("<td />").text(record.id_usuario).appendTo(row);
							$("<td />").text(record.email).appendTo(row);
							$("<td />").text(record.nombre).appendTo(row);
							$("<td />").text(record.municipio).appendTo(row);
							$("<td />").text(record.estado).appendTo(row);
							$("<td />").text(record.operador).appendTo(row);
							$("<td />").text(record.supervisor).appendTo(row);
							$("<td />").text(record.visor_gral).appendTo(row);
							$("<td />").text(record.visor_inver).appendTo(row);
							$("<td />").text(record.visor_presi).appendTo(row);
							row.appendTo("table");
						}
					})
				}

				$('table').dataTable({
					"bJQueryUI": true,
					"sPaginationType": "full_numbers"
				})
			}
		});
	
})
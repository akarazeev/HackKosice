import qrcode


"""
    patient_id - айди пацента или любая информация, которую хотим сохранить (до 300 символов)
    save_path - путь сохранения файла с его именем
"""


def create_code(patient_id, save_path):

    qr = qrcode.QRCode(
        version = 1,
        error_correction = qrcode.constants.ERROR_CORRECT_H,
        box_size = 10,
        border = 4,
    )

    qr.add_data(patient_id)
    qr.make(fit=True)

    img = qr.make_image()

    img.save(save_path)
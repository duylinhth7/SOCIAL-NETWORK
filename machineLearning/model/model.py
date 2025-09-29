import pickle
import sys, os
sys.path.append(os.path.dirname(__file__))  # thêm folder model vào path
from nlp import process_text


# Lấy đường dẫn hiện tại của file model.py
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
PIPELINE_PATH = os.path.join(BASE_DIR, "pipeline_toxic.pkl")
with open(PIPELINE_PATH, "rb") as f:
    model = pickle.load(f)

#Hàm trả về kết quả dự đoán của model. 1 == toxic | 0 == non-toxic
def predict(text):
    text_processed = process_text(text)
    pred = model.predict(text_processed)
    return pred[0]
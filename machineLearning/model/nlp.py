import re
from sklearn.feature_extraction.text import TfidfVectorizer
import sklearn.feature_extraction.text as text
import pickle
import os

# Danh sách stopwords cơ bản tiếng Việt
stopwords = set([
    "và", "còn", "là", "của", "có", "như", "cho", "trong", 
    "một", "những", "được", "khi", "này", "với", "ra", "từ", 
    "nên", "nếu", "thì", "ở", "đã", "cả"
])

# Danh sách từ viết tắt phổ biến
abbreviations = {
    r'\bko\b': 'không',
    r'\bk\b': 'không',
    r'\bdc\b': 'được',
    r'\bthik\b': 'thích',
    r'\bj\b': 'gì',
    r'\bhj\b': 'haha'
}

def decontracted(text):
    # 1. Chuyển chữ hoa → chữ thường
    text = text.lower()
    
    # 2. Thay từ viết tắt
    for abbr, full in abbreviations.items():
        text = re.sub(abbr, full, text)
    
    # 3. Loại bỏ ký tự không phải chữ, số, khoảng trắng
    text = re.sub(r'[^a-zA-Z0-9À-ỹ\s]', ' ', text)
    
    # 4. Loại bỏ stopwords
    text = ' '.join([w for w in text.split() if w not in stopwords])
    
    # 5. Chuẩn hóa khoảng trắng
    text = re.sub(r'\s+', ' ', text).strip()
    
    return text
 #hàm clear_link thực hiện loại bỏ liên kết (link), địa chỉ email trong câu
def clear_link(st):
    #Remove links/email
    word = re.sub(r'((http|https)\:\/\/)?[a-zA-Z0-9\.\/\?\:@\-_=#]+\.([a-zA-Z]){2,6}([a-zA-Z0-9\.\&\/\?\:@\-_=#])*', 
                '', st, flags=re.MULTILINE)
    word = re.sub(r'(@[^\s]*)', "", word)
    #word = re.sub('[\W]', ' ', st)
    return word
def clear_punctuation(st):
    # 1. Thay dấu gạch dưới bằng khoảng trắng
    st = st.replace('_', ' ')
    
    # 2. Loại bỏ tất cả ký tự không phải chữ, số, khoảng trắng
    st = re.sub(r'[^a-zA-Z0-9À-ỹ\s]', ' ', st)
    
    # 3. Chuẩn hóa khoảng trắng (nhiều khoảng trắng → 1 khoảng trắng)
    st = re.sub(r'\s+', ' ', st).strip()
    
    return st


#Hàm clear_noise kết hợp sử dụng các hàm ở trên để xử lý chuỗi
def clear_noise(word):
    word = word.lower()         # chuyển toàn bộ sang chữ thường để xử lý
    word = decontracted(word)
    word = clear_link(word)
    word = clear_punctuation(word)
    return word

# Danh sách stopwords
stopwords_vi = set([
    "và", "hoặc", "nhưng", "thì", "là", "có", "ở", "cho", 
    "với", "của", "một", "những", "này", "kia", "đó", "khi",
    "nếu", "đã", "cũng", "như", "ra", "về", "tại", "đến", "từ", "vì", "nên", "cả"
])

# Hàm loại bỏ stopwords
def clear_stopwords(st):
    return " ".join([w for w in st.split() if w not in stopwords_vi])

#Xây dựng hàm prepare_data: để thực hiện tiền xử lý dữ liệu
def prepare_data(word):
    word = clear_noise(word)        #Loại bỏ nhiễu trong các comment
    word = clear_stopwords(word)    #Loại bỏ stopword trong các comment
    return word

# Lấy đường dẫn hiện tại của file nlp.py
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
VECTOR_PATH = os.path.join(BASE_DIR, "vectorizer.pkl")

with open(VECTOR_PATH, "rb") as f:
    vectorizer = pickle.load(f)
def embedding(text):
    st_tf_idf = vectorizer.transform([text])
    return st_tf_idf


#Hàm cuối cùng tổng quát để xử lý và mã hóa text
def process_text(text):
    word = prepare_data(text)
    return embedding(word)
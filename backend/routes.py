from app import app, db
from flask import request, jsonify
from models import Friend


#Get all friends
@app.route('/api/friends', methods=["GET"])
def get_friend():
    friends = Friend.query.all()
    #crear una lista en formato JSON
    result = [friend.to_json() for friend in friends]
    return jsonify(result)

#creae a friend
@app.route('/api/friends', methods=["POST"])
def create_friend():
    try:
        data = request.get_json()
        
        required_field = ["name", "role", "description", "gender"]
        for field in required_field:
            if not field in data:
                return jsonify({"error": f'missing a field: {field}'}), 400
        
        name = data.get("name")
        role = data.get("role")
        description = data.get("description")
        gender = data.get("gender")
        
        #Fetch avatar imagen basado en el genero
        if gender == "male":
            img_url = f"https://avatar.iran.liara.run/public/boy?username={name}"
        elif gender == "female":
            img_url = f"https://avatar.iran.liara.run/public/girl?username={name}"
        else:
            img_url = None
        
        new_friend = Friend(name=name, role=role, description=description, gender=gender, img_url=img_url)
        
        db.session.add(new_friend)
        db.session.commit()
        
        return jsonify({"msg": "Friend created successfully"}), 201
    
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500
    
#Delete a friend
@app.route('/api/friends/<int:id>', methods=["DELETE"])
def delete_friend(id):
    try:
        friend = Friend.query.get(id)
        if friend is None:
            return jsonify({"error": "Friend not found"}), 400
        
        db.session.delete(friend)
        db.session.commit()
        
        return jsonify({"message": "Friend delete!"}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)})
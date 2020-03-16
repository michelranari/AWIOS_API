//
//  AnswerLiked.swift
//  Motee
//
//  Created by Amjad Menouer on 11/03/2020.
//  Copyright © 2020 groupe3. All rights reserved.
//

import SwiftUI

struct AnswerLiked : View {
    @ObservedObject var answer : Answer
    @ObservedObject var user : User
    
    var body: some View {
        Button(action:{
            if self.answer.estLikee(utilisateur: self.user){
                self.answer.disliker(userDislike: self.user)
            }else{
                self.answer.liker(userLike: self.user)
            }
        }){
            HStack{
                if self.answer.estLikee(utilisateur: user){
                    Image(systemName: "heart.fill").foregroundColor(Color.red)
                } else {
                    Image(systemName: "heart").foregroundColor(Color.pink)
                }
                Text(String(answer.nbLikes)).foregroundColor(.pink)
            }
        }
    }
}

struct AnswerLiked_Previews: PreviewProvider {
    static var previews: some View {
        AnswerLiked(answer: Answer(from: Decoder)
            , user: User(from: Decoder))
    }
}

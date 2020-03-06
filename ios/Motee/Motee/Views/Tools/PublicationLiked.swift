//
//  publicationLiked.swift
//  Motee
//
//  Created by Rayan Bahroun on 06/03/2020.
//  Copyright © 2020 groupe3. All rights reserved.
//

import SwiftUI

struct PublicationLiked : View {
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
                    Image(systemName: "heart").foregroundColor(Color.black)
                }
                Text(String(answer.nbLikes))
            }
        }
    }
}

struct PublicationLiked_Previews: PreviewProvider {
    static var previews: some View {
        PublicationLiked(answer: Answer(userR: User(pseudo: "Niska", password: "root", email: "root", city: "ville"), identifierR: 18, contentR: "Charlie delta commando", anonymousR: true, tagsR: [])
            , user: User(pseudo: "root", password: "root", email: "root", city: "ville"))
    }
}

//
//  PropositionView.swift
//  Motee
//
//  Created by Rayan Bahroun on 06/03/2020.
//  Copyright © 2020 groupe3. All rights reserved.
//

import SwiftUI

struct PropositionView : View {
    
     @State var text = "Ceci est un propos test \" \" "
     @State var showAnswers = false
    //utilisé un objet Proposition
    
    var body: some View {
        VStack{
            VStack{
                HStack{
                    Text("Pseudo").bold()
                    Spacer()
                    Text(getDate())
                    Spacer()
                    Text("like")
                }
                .padding(.horizontal)
            Spacer()
                Text(text)
                    .padding(.horizontal)
            Spacer()
                PublicationFooter().padding()
                Button(
                    action : {
                        self.showAnswers.toggle()
                    }){
                       Text("afficher les réponses")
                }
                
            }.frame(width: 380, height : 220 , alignment: .leading)
            .background(lightGreyColor)
            .cornerRadius(20).shadow(radius: 20)
            .padding()
            if (showAnswers){
                Text("la réponse")
            }
        }
        
    }
}

func getDate() -> String {
    return "28 juin 2020"
}

func getLike() -> String {
    return "100"
}
struct PropositionView_Previews: PreviewProvider {
    static var previews: some View {
        PropositionView()
    }
}

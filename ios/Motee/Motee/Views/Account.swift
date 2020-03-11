//
//  Account.swift
//  Motee
//
//  Created by Rayan Bahroun on 08/03/2020.
//  Copyright © 2020 groupe3. All rights reserved.
//

import SwiftUI


struct Account: View {
    @State var user = getUserConnected()
    
    var body: some View {
        NavigationView{
            VStack{
                Title(myTitle: "Mes informations").padding(.vertical)
                VStack(alignment: .leading){
                    HStack(alignment: .center){
                        SymbolGenerator(mySymbol: "person", myColor: "black")
                        Text(user.pseudo).padding(.vertical)
                    }
                    HStack{
                        SymbolGenerator(mySymbol: "envelope", myColor: "black")
                        Text(user.email).padding(.vertical)
                    }
                    HStack{
                        SymbolGenerator(mySymbol: "location", myColor: "black")
                        Text(user.city).padding(.vertical)
                    }
                }
                Title(myTitle: "Mes contributions").padding(.vertical)
                
                if (user.publications.count>0){
                    Text("\(user.pseudo) merci pour vos \(user.publications.count) réponses").padding(.vertical)
                }else{
                    Text("\(user.pseudo) ! vous n'avez pas encore contribué à l'application.. et si c'était le moment de nous partager votre expérience ? ").padding(.all)
                }
                NavigationLink(destination: Accueil()){
                    Text("Je contribue tout de suite !")
                        .font(.headline)
                        .foregroundColor(.white)
                        .padding(.vertical)
                        .frame(width: 320, height: 60)
                        .background(generateColor(name: "blue"))
                        .cornerRadius(40)
                }
                Spacer()
            }
        }
    }
}
func getUserConnected() -> User {
    return User(pseudo: "Niska",
                password: "root",
                email: "niska@gmail.com",
                city: "Dijon")
}

struct Account_Previews: PreviewProvider {
    static var previews: some View {
        Account()
    }
}


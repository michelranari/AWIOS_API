//
//  Root.swift
//  Motee
//
//  Created by Rayan Bahroun on 07/03/2020.
//  Copyright © 2020 groupe3. All rights reserved.
//
import SwiftUI

struct Root : View {
    var currentPage : String
    var body: some View {
        ZStack{
            if(currentPage == "Accueil"){
                Accueil()
            }else if currentPage == "Login" {
                LoginForm()
            }else if currentPage == "Account"{
                Account()
            }
            else{
                Accueil()
            }
        }
    }
}

struct Root_Previews: PreviewProvider {
    @State static var page = "login"
    static var previews: some View {
        Root(currentPage: page)
    }
}
